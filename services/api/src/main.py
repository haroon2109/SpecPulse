from fastapi import FastAPI, UploadFile, File, Depends
from fastapi.responses import StreamingResponse
import json
from sqlalchemy.orm import Session
from src.database import get_db
from src.models import HITLItem, Workspace, User
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import os
from pydantic import BaseModel
from typing import Dict, Any, Optional
from fastapi import HTTPException, status
from passlib.context import CryptContext
import jwt

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "specpulse_super_secret_key_mvp"
ALGORITHM = "HS256"

class UserCreate(BaseModel):
    email: str
    password: str
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

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class WorkspaceCreate(BaseModel):
    id: str
    workspace: Dict[str, Any]
    preferences: Dict[str, Any]
    dataSources: Dict[str, Any]
    currentStep: int

@app.post("/auth/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    import datetime
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = pwd_context.hash(user.password)
    new_user = User(email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    token = jwt.encode({"sub": user.email, "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer", "user_id": new_user.id}

@app.post("/auth/login")
def login(user: UserCreate, db: Session = Depends(get_db)):
    import datetime
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not pwd_context.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    token = jwt.encode({"sub": user.email, "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer", "user_id": db_user.id}

@app.post("/workspace")
def save_workspace(data: WorkspaceCreate, db: Session = Depends(get_db)):
    db_workspace = db.query(Workspace).filter(Workspace.id == data.id).first()
    if not db_workspace:
        db_workspace = Workspace(id=data.id)
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
def get_workspace(workspace_id: str, db: Session = Depends(get_db)):
    ws = db.query(Workspace).filter(Workspace.id == workspace_id).first()
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
async def process_spec(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Save the file temporarily
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

@app.post("/process-spec-stream")
async def process_spec_stream(file: UploadFile = File(...), db: Session = Depends(get_db)):
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
