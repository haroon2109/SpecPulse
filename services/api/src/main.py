from fastapi import FastAPI, UploadFile, File, Depends
from fastapi.responses import StreamingResponse
import json
from sqlalchemy.orm import Session
from src.database import get_db
from src.models import HITLItem, Workspace, User
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import os
from pydantic import BaseModel, EmailStr, constr, Field
from typing import Dict, Any, Optional
from fastapi import Request, HTTPException, Path, Query
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from src.utils.auth import create_access_token, create_refresh_token, get_password_hash, verify_password, generate_secure_token, get_current_user
from src.utils.email import send_verification_email, send_password_reset_email
from src.utils.logger import security_logger, traffic_logger, app_logger
from src.utils.validation import validate_pdf_upload
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware
import time

limiter = Limiter(key_func=get_remote_address)

class UserCreate(BaseModel):
    email: EmailStr
    password: constr(min_length=8, max_length=128)

class PasswordReset(BaseModel):
    token: constr(min_length=10, max_length=128, pattern="^[a-zA-Z0-9_-]+$")
    new_password: constr(min_length=8, max_length=128)
from src.agents.extractor_agent import DocumentExtractorSubAgent
from src.agents.normalization_agent import EngineeringNormalizationAgent
from src.agents.taxonomy_agent import TaxonomyAgent
from src.agents.audit_gate import AuditGate
from src.routers import hitl

# Instantiate agents
extractor = DocumentExtractorSubAgent()
normalizer = EngineeringNormalizationAgent()
taxonomy_mapper = TaxonomyAgent()
audit_gate = AuditGate()

app = FastAPI(
    title="SpecPulse API",
    description="Autonomous, Multi-Agent Product Intelligence Engine API",
    version="0.1.0",
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

if os.getenv("ENFORCE_HTTPS", "false").lower() == "true":
    app.add_middleware(HTTPSRedirectMiddleware)

app.add_middleware(ProxyHeadersMiddleware, trusted_hosts="*")

@app.middleware("http")
async def traffic_monitor(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    
    log_extra = {"client_ip": request.client.host if request.client else "unknown"}
    if response.status_code == 404:
        traffic_logger.warning(f"404 Not Found: {request.url.path}", extra=log_extra)
    elif response.status_code == 429:
        traffic_logger.warning(f"429 Rate Limit Exceeded: {request.url.path}", extra=log_extra)
    elif response.status_code >= 500:
        app_logger.error(f"Server Error {response.status_code} on {request.url.path}", extra=log_extra)
        
    return response

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    log_extra = {"client_ip": request.client.host if request.client else "unknown"}
    app_logger.exception(f"Unhandled exception on {request.url.path}", exc_info=exc, extra=log_extra)
    from fastapi.responses import JSONResponse
    return JSONResponse(status_code=500, content={"detail": "Internal Server Error"})

# Configure CORS for production and local development
origins = os.getenv("FRONTEND_URLS", "http://localhost:5173,http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class WorkspaceCreate(BaseModel):
    id: constr(min_length=1, max_length=100, pattern="^[a-zA-Z0-9_-]+$")
    workspace: Dict[str, Any]
    preferences: Dict[str, Any]
    dataSources: Dict[str, Any]
    currentStep: int

@app.post("/auth/register")
@limiter.limit("5/minute")
def register(request: Request, user: UserCreate, db: Session = Depends(get_db)):
    log_extra = {"client_ip": request.client.host if request.client else "unknown"}
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        security_logger.warning(f"Registration attempt for existing email: {user.email}", extra=log_extra)
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    verification_token = generate_secure_token()
    
    new_user = User(
        email=user.email, 
        hashed_password=hashed_password,
        verification_token=verification_token,
        is_email_verified=False
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    send_verification_email(new_user.email, verification_token)
    security_logger.info(f"Successful registration for email: {user.email}", extra=log_extra)
    return {"message": "Registration successful. Please check your email to verify your account."}

@app.get("/auth/verify-email/{token}")
@limiter.limit("10/minute")
def verify_email(request: Request, token: str = Path(..., min_length=10, max_length=128, pattern="^[a-zA-Z0-9_-]+$"), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.verification_token == token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid verification token")
        
    user.is_email_verified = True
    user.verification_token = None
    db.commit()
    return {"message": "Email successfully verified. You can now log in."}

@app.post("/auth/login")
@limiter.limit("10/minute")
def login(request: Request, user: UserCreate, db: Session = Depends(get_db)):
    log_extra = {"client_ip": request.client.host if request.client else "unknown", "user_email": user.email}
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        security_logger.warning(f"Failed login attempt for email: {user.email}", extra=log_extra)
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    if not db_user.is_email_verified:
        security_logger.warning(f"Login attempt by unverified email: {user.email}", extra=log_extra)
        raise HTTPException(status_code=403, detail="Email not verified. Please check your inbox.")
        
    access_token = create_access_token({"sub": user.email})
    refresh_token = create_refresh_token({"sub": user.email})
    security_logger.info(f"Successful login for email: {user.email}", extra=log_extra)
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer", "user_id": db_user.id}

@app.post("/auth/refresh")
@limiter.limit("20/minute")
def refresh_token(request: Request, refresh_token: str, db: Session = Depends(get_db)):
    # In a real app, you would verify the refresh token JWT here
    # For MVP, we will just return a new access token if they provide a valid one
    import jwt
    from src.utils.auth import SECRET_KEY, ALGORITHM
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        access_token = create_access_token({"sub": email})
        return {"access_token": access_token, "token_type": "bearer"}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Refresh token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

@app.post("/auth/forgot-password")
@limiter.limit("3/minute")
def forgot_password(request: Request, email: str, db: Session = Depends(get_db)):
    import datetime
    user = db.query(User).filter(User.email == email).first()
    if user:
        reset_token = generate_secure_token()
        user.reset_password_token = reset_token
        user.reset_password_expires = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        db.commit()
        send_password_reset_email(user.email, reset_token)
    # Always return 200 to prevent email enumeration
    return {"message": "If that email exists, a reset link has been sent."}

@app.post("/auth/reset-password")
@limiter.limit("5/minute")
def reset_password(request: Request, data: PasswordReset, db: Session = Depends(get_db)):
    import datetime
    log_extra = {"client_ip": request.client.host if request.client else "unknown"}
    user = db.query(User).filter(User.reset_password_token == data.token).first()
    if not user or user.reset_password_expires < datetime.datetime.utcnow():
        security_logger.warning("Invalid or expired password reset token used", extra=log_extra)
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
        
    user.hashed_password = get_password_hash(data.new_password)
    user.reset_password_token = None
    user.reset_password_expires = None
    db.commit()
    security_logger.info(f"Password successfully reset for email: {user.email}", extra=log_extra)
    return {"message": "Password successfully reset."}

@app.post("/workspace")
@limiter.limit("10/minute")
def save_workspace(request: Request, data: WorkspaceCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_workspace = db.query(Workspace).filter(Workspace.id == data.id).first()
    if db_workspace and db_workspace.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to modify this workspace")
    if not db_workspace:
        db_workspace = Workspace(id=data.id, user_id=current_user.id)
        db.add(db_workspace)
        
    db_workspace.full_name = data.workspace.get('fullName', '')
    db_workspace.work_email = data.workspace.get('workEmail', '')
    db_workspace.job_title = data.workspace.get('jobTitle', '')
    db_workspace.phone = data.workspace.get('phone', '')
    db_workspace.workspace_name = data.workspace.get('workspaceName', '')
    db_workspace.workspace_slug = data.workspace.get('workspaceSlug', '')
    db_workspace.industry = data.workspace.get('industry', '')
    db_workspace.team_size = data.workspace.get('teamSize', '')
    db_workspace.preferences = data.preferences
    db_workspace.data_sources = data.dataSources
    db_workspace.current_step = data.currentStep
    
    db.commit()
    db.refresh(db_workspace)
    return {"status": "success", "id": db_workspace.id}

@app.get("/workspace/{workspace_id}")
@limiter.limit("60/minute")
def get_workspace(request: Request, workspace_id: str = Path(..., min_length=1, max_length=100, pattern="^[a-zA-Z0-9_-]+$"), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    ws = db.query(Workspace).filter(Workspace.id == workspace_id, Workspace.user_id == current_user.id).first()
    if ws:
        return {
            "id": ws.id,
            "workspace": {
                "fullName": ws.full_name,
                "workEmail": ws.work_email,
                "jobTitle": ws.job_title,
                "phone": ws.phone,
                "workspaceName": ws.workspace_name,
                "workspaceSlug": ws.workspace_slug,
                "industry": ws.industry,
                "teamSize": ws.team_size
            },
            "preferences": ws.preferences,
            "dataSources": ws.data_sources,
            "currentStep": ws.current_step
        }
    return {"status": "not_found"}

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "SpecPulse API"}

@app.get("/")
def read_root():
    return {"message": "Welcome to SpecPulse API"}

@app.post("/process-spec")
@limiter.limit("5/minute")
async def process_spec(request: Request, file: UploadFile = Depends(validate_pdf_upload), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Persist the file permanently in MinIO
    minio_object_name = await upload_to_minio(file)
    
    # Reset file pointer and save temporarily for the PDF extractor
    file.file.seek(0)
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        content = await file.read()
        temp_file.write(content)
        temp_file_path = temp_file.name

    try:
        # Step 1: Extraction
        ext_result = extractor.process(temp_file_path)
        raw_attributes = ext_result.get("raw_attributes", [])
        
        # Step 2: Normalization
        normalized_attrs = normalizer.normalize(raw_attributes)
        
        # Step 3: Taxonomy Mapping
        tax_result = taxonomy_mapper.classify(file.filename, normalized_attrs)
        
        # Step 4: Audit Gate
        final_attributes = audit_gate.evaluate(normalized_attrs)
        
        # Insert low-confidence items into DB for HITL Review
        for attr in final_attributes:
            if attr.get("confidence", 100.0) < 80.0:
                hitl_record = HITLItem(
                    user_id=current_user.id,
                    product_name=tax_result["standardized_title"],
                    attribute_key=attr.get("key", "Unknown"),
                    extracted_value=attr.get("original", "N/A"),
                    confidence=attr.get("confidence", 0.0),
                    source_snippet=f"Review required for {attr.get('key')}"
                )
                db.add(hitl_record)
        db.commit()
        
        return {
            "id": f"batch_{abs(hash(file.filename))}",
            "asset_name": file.filename,
            "standardized_title": tax_result["standardized_title"],
            "taxonomy": tax_result["taxonomy"],
            "attributes": final_attributes,
            "status": "success"
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

@app.post("/process-spec-async")
@limiter.limit("10/minute")
async def process_spec_async(request: Request, file: UploadFile = Depends(validate_pdf_upload), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Persist the file permanently in MinIO
    minio_object_name = await upload_to_minio(file)
    
    # Queue the background task in Celery
    task = process_catalog_background_task.delay(minio_object_name, file.filename, current_user.id)
    
    return {"status": "processing", "task_id": task.id}

@app.get("/task/{task_id}")
@limiter.limit("120/minute")
def get_task_status(request: Request, task_id: str = Path(..., min_length=1, max_length=100, pattern="^[a-zA-Z0-9_-]+$")):
    task = celery_app.AsyncResult(task_id)
    # Handle the structure of celery task info
    if isinstance(task.info, dict):
        return {"status": task.state, "result": task.info}
    return {"status": task.state, "message": str(task.info)}

@app.post("/process-spec-stream")
@limiter.limit("5/minute")
async def process_spec_stream(request: Request, file: UploadFile = Depends(validate_pdf_upload), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Persist the file permanently in MinIO
    minio_object_name = await upload_to_minio(file)
    
    # Reset file pointer and save temporarily for the PDF extractor
    file.file.seek(0)
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        content = await file.read()
        temp_file.write(content)
        temp_file_path = temp_file.name

    def generate():
        try:
            yield json.dumps({"type": "status", "message": f"Ingesting '{file.filename}'..."}) + "\n"
            
            # Step 1: Extraction
            yield json.dumps({"type": "status", "message": "Vision Agent: Parsing PDF bounding boxes..."}) + "\n"
            ext_result = extractor.process(temp_file_path)
            raw_attributes = ext_result.get("raw_attributes", [])
            yield json.dumps({"type": "status", "message": f"Vision Agent: Extracted {len(raw_attributes)} raw attributes."}) + "\n"
            
            # Step 2: Normalization
            yield json.dumps({"type": "status", "message": "Normalization Agent: Standardizing engineering units..."}) + "\n"
            normalized_attrs = normalizer.normalize(raw_attributes)
            
            # Step 3: Taxonomy Mapping
            yield json.dumps({"type": "status", "message": "Taxonomy Agent: Embedding and clustering against PIM standard..."}) + "\n"
            tax_result = taxonomy_mapper.classify(file.filename, normalized_attrs)
            
            # Step 4: Audit Gate
            yield json.dumps({"type": "status", "message": "Audit Agent: Evaluating extraction confidence and bounds..."}) + "\n"
            final_attributes = audit_gate.evaluate(normalized_attrs)
            
            # Insert low-confidence items into DB for HITL Review
            for attr in final_attributes:
                if attr.get("confidence", 100.0) < 80.0:
                    hitl_record = HITLItem(
                        user_id=current_user.id,
                        product_name=tax_result["standardized_title"],
                        attribute_key=attr.get("key", "Unknown"),
                        extracted_value=attr.get("original", "N/A"),
                        confidence=attr.get("confidence", 0.0),
                        source_snippet=f"Review required for {attr.get('key')}"
                    )
                    db.add(hitl_record)
            db.commit()
            
            result = {
                "id": f"batch_{abs(hash(file.filename))}",
                "asset_name": file.filename,
                "standardized_title": tax_result["standardized_title"],
                "taxonomy": tax_result["taxonomy"],
                "attributes": final_attributes,
                "status": "success"
            }
            yield json.dumps({"type": "result", "data": result}) + "\n"
        except Exception as e:
            yield json.dumps({"type": "error", "message": str(e)}) + "\n"
        finally:
            if os.path.exists(temp_file_path):
                os.remove(temp_file_path)
                
    return StreamingResponse(generate(), media_type="application/x-ndjson")

app.include_router(hitl.router)
