from sqlalchemy import Column, Integer, String, JSON, DateTime, Float
from .database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ProductInfo(Base):
    __tablename__ = "product_info"

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String, index=True)
    category = Column(String, index=True)
    specifications = Column(JSON) # Store diverse specs here
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class HITLItem(Base):
    __tablename__ = "hitl_items"
    
    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String, index=True)
    attribute_key = Column(String)
    extracted_value = Column(String)
    confidence = Column(Float)
    source_snippet = Column(String)
    status = Column(String, default="PENDING")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Workspace(Base):
    __tablename__ = "workspaces"
    
    id = Column(String, primary_key=True, index=True) # Storing a random string ID from frontend
    full_name = Column(String)
    work_email = Column(String)
    job_title = Column(String)
    phone = Column(String)
    workspace_name = Column(String)
    workspace_slug = Column(String)
    industry = Column(String)
    team_size = Column(String)
    
    preferences = Column(JSON) # goals, dataTypes, workflow, priorities, notes
    data_sources = Column(JSON) # selectedTypes, connectedSources
    
    current_step = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
