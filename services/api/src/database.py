from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Use PostgreSQL from Docker by default
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://specpulse:specpulse_password@localhost:5432/specpulse_db")

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
