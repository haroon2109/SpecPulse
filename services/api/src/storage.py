import os
import boto3
from botocore.client import Config
from fastapi import UploadFile
import uuid
import shutil

# Get MinIO credentials from .env
MINIO_URL = os.getenv("MINIO_URL")
MINIO_ACCESS_KEY = os.getenv("MINIO_ACCESS_KEY")
MINIO_SECRET_KEY = os.getenv("MINIO_SECRET_KEY")

if not MINIO_URL or not MINIO_ACCESS_KEY or not MINIO_SECRET_KEY:
    raise ValueError("MinIO credentials (MINIO_URL, MINIO_ACCESS_KEY, MINIO_SECRET_KEY) must be set in the environment")
BUCKET_NAME = "specpulse-catalogs"

LOCAL_MODE = MINIO_URL.lower() == "local"
LOCAL_UPLOAD_DIR = "/tmp/specpulse-uploads"

s3_client = None
if not LOCAL_MODE:
    # Initialize the S3 client using boto3
    s3_client = boto3.client(
        "s3",
        endpoint_url=MINIO_URL,
        aws_access_key_id=MINIO_ACCESS_KEY,
        aws_secret_access_key=MINIO_SECRET_KEY,
        config=Config(signature_version="s3v4"),
        region_name="us-east-1" 
    )

def ensure_bucket_exists():
    """Ensure the target bucket exists in MinIO, or local dir exists."""
    if LOCAL_MODE:
        os.makedirs(LOCAL_UPLOAD_DIR, exist_ok=True)
        return
        
    try:
        s3_client.head_bucket(Bucket=BUCKET_NAME)
    except Exception:
        s3_client.create_bucket(Bucket=BUCKET_NAME)

async def upload_to_minio(file: UploadFile) -> str:
    """
    Uploads a FastAPI UploadFile to MinIO (or local disk) and returns the unique object name.
    """
    ensure_bucket_exists()
    
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    
    file.file.seek(0)
    
    if LOCAL_MODE:
        file_path = os.path.join(LOCAL_UPLOAD_DIR, unique_filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    else:
        s3_client.upload_fileobj(
            file.file,
            BUCKET_NAME,
            unique_filename,
            ExtraArgs={"ContentType": file.content_type}
        )
    
    return unique_filename

def get_file_url(object_name: str) -> str:
    """Generates a pre-signed URL (or local path) to view the file."""
    if LOCAL_MODE:
        return f"file://{os.path.join(LOCAL_UPLOAD_DIR, object_name)}"
        
    try:
        url = s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': BUCKET_NAME, 'Key': object_name},
            ExpiresIn=3600 # Valid for 1 hour
        )
        return url
    except Exception as e:
        print(f"Error generating presigned URL: {e}")
        return ""
