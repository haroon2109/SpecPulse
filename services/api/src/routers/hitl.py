from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from pydantic import BaseModel
from typing import List, Optional

from src.models import HITLItem

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
def get_hitl_queue(db: Session = Depends(get_db)):
    items = db.query(HITLItem).filter(HITLItem.status == "PENDING").all()
    return items

class HITLResolutionRequest(BaseModel):
    approved_value: str
    is_correct: bool

@router.post("/resolve/{item_id}")
def resolve_hitl_item(item_id: int, resolution: HITLResolutionRequest, db: Session = Depends(get_db)):
    hitl_item = db.query(HITLItem).filter(HITLItem.id == item_id).first()
    if not hitl_item:
        raise HTTPException(status_code=404, detail="Item not found")
        
    hitl_item.status = "RESOLVED"
    hitl_item.extracted_value = resolution.approved_value
    db.commit()
    
    return {"message": f"Item {item_id} resolved successfully.", "status": "RESOLVED"}

@router.get("/stats")
def get_hitl_stats(db: Session = Depends(get_db)):
    resolved = db.query(HITLItem).filter(HITLItem.status == "RESOLVED").count()
    pending = db.query(HITLItem).filter(HITLItem.status == "PENDING").count()
    return {"resolved": resolved, "pending": pending}
