from fastapi import UploadFile, HTTPException
import re

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

async def validate_pdf_upload(file: UploadFile) -> UploadFile:
    # 1. Validate content type
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDFs are allowed.")
    
    # 2. Validate file extension just to be safe
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Invalid file extension. Only .pdf is allowed.")
        
    # 3. Sanitize filename to prevent directory traversal
    sanitized_name = re.sub(r'[^a-zA-Z0-9_.-]', '_', file.filename)
    if not sanitized_name:
        sanitized_name = "upload.pdf"
    file.filename = sanitized_name
    
    # 4. Check file size
    file.file.seek(0, 2) # Move to end of file
    size = file.file.tell() # Get current position
    file.file.seek(0) # Reset to beginning
    
    if size > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail=f"File too large. Max size is {MAX_FILE_SIZE / (1024*1024)}MB.")
        
    return file
