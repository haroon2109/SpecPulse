from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from pydantic import BaseModel
from typing import List, Optional

from src.models import HITLItem, User
from src.utils.auth import get_current_user
from fastapi import Request
from ..main import limiter

router = APIRouter(
    prefix="/hitl",
    tags=["Human-in-the-Loop"],
)

class HITLItemResponse(BaseModel):
    id: int
    product_name: str
    attribute_key: str
    extracted_value: str
    confidence: float
    source_snippet: str
    status: str

@router.get("/queue", response_model=List[HITLItemResponse])
@limiter.limit("30/minute")
def get_hitl_queue(request: Request, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    items = db.query(HITLItem).filter(HITLItem.status == "PENDING", HITLItem.user_id == current_user.id).all()
    return items

from pydantic import BaseModel, constr
from fastapi import APIRouter, Depends, HTTPException, Path

class HITLResolutionRequest(BaseModel):
    approved_value: constr(max_length=1000)
    is_correct: bool

@router.post("/resolve/{item_id}")
@limiter.limit("60/minute")
def resolve_hitl_item(request: Request, resolution: HITLResolutionRequest, item_id: int = Path(..., ge=1), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    hitl_item = db.query(HITLItem).filter(HITLItem.id == item_id, HITLItem.user_id == current_user.id).first()
    if not hitl_item:
        raise HTTPException(status_code=404, detail="Item not found or you are not authorized to access it")
        
    hitl_item.status = "RESOLVED"
    hitl_item.extracted_value = resolution.approved_value
    db.commit()
    
    return {"message": f"Item {item_id} resolved successfully.", "status": "RESOLVED"}

@router.get("/stats")
@limiter.limit("30/minute")
def get_hitl_stats(request: Request, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    resolved = db.query(HITLItem).filter(HITLItem.status == "RESOLVED", HITLItem.user_id == current_user.id).count()
    pending = db.query(HITLItem).filter(HITLItem.status == "PENDING", HITLItem.user_id == current_user.id).count()
    return {"resolved": resolved, "pending": pending}
