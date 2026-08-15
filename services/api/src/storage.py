import os
import boto3
from botocore.client import Config
from fastapi import UploadFile
import uuid

# Get MinIO credentials from .env
MINIO_URL = os.getenv("MINIO_URL")
MINIO_ACCESS_KEY = os.getenv("MINIO_ACCESS_KEY")
MINIO_SECRET_KEY = os.getenv("MINIO_SECRET_KEY")

if not MINIO_URL or not MINIO_ACCESS_KEY or not MINIO_SECRET_KEY:
    raise ValueError("MinIO credentials (MINIO_URL, MINIO_ACCESS_KEY, MINIO_SECRET_KEY) must be set in the environment")
BUCKET_NAME = "specpulse-catalogs"

# Initialize the S3 client using boto3, pointing to our local MinIO server
s3_client = boto3.client(
    "s3",
    endpoint_url=MINIO_URL,
    aws_access_key_id=MINIO_ACCESS_KEY,
    aws_secret_access_key=MINIO_SECRET_KEY,
    config=Config(signature_version="s3v4"),
    region_name="us-east-1" # Required parameter, but ignored by MinIO
)

def ensure_bucket_exists():
    """Ensure the target bucket exists in MinIO."""
    try:
        s3_client.head_bucket(Bucket=BUCKET_NAME)
    except Exception:
        # If it doesn't exist, create it
        s3_client.create_bucket(Bucket=BUCKET_NAME)

async def upload_to_minio(file: UploadFile) -> str:
    """
    Uploads a FastAPI UploadFile to MinIO and returns the unique object name.
    """
    ensure_bucket_exists()
    
    # Generate a unique file name to avoid collisions
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    
    # Upload the file to MinIO
    file.file.seek(0)
    s3_client.upload_fileobj(
        file.file,
        BUCKET_NAME,
        unique_filename,
        ExtraArgs={"ContentType": file.content_type}
    )
    
    return unique_filename

def get_file_url(object_name: str) -> str:
    """Generates a pre-signed URL to view the file."""
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
