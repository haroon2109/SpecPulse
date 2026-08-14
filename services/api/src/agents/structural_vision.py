import pdfplumber
import fitz # PyMuPDF
import io
import json

class StructuralVisionAgent:
    """
    Stage 1: Structural Extraction (Vision & Table Parsing)
    Antigravity Role: Routes input to document parsing tools.
    Open-Source Tech: pdfplumber or PyMuPDF.
    Output: Clean structured JSON preserving table headers, bounding box coordinates, and raw text snippets.
    """
    
    def extract_from_pdf(self, file_bytes: bytes) -> str:
        """
        Extracts structural text and tables, returning JSON with bounding boxes and text.
        """
        extracted_data = {
            "text_blocks": [],
            "tables": []
        }
        
        # 1. Text extraction with PyMuPDF including bounding boxes
        with fitz.open(stream=file_bytes, filetype="pdf") as doc:
            for page_num, page in enumerate(doc):
                blocks = page.get_text("dict")["blocks"]
                for block in blocks:
                    if "lines" in block:
                        block_text = ""
                        for line in block["lines"]:
                            for span in line["spans"]:
                                block_text += span["text"] + " "
                        extracted_data["text_blocks"].append({
                            "page": page_num + 1,
                            "bbox": block["bbox"], # [x0, y0, x1, y1]
                            "text": block_text.strip()
                        })
                
        # 2. Table extraction with pdfplumber
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            for page_num, page in enumerate(pdf.pages):
                tables = page.extract_tables()
                for table in tables:
                    if not table or len(table) < 2: continue
                    headers = table[0]
                    rows = table[1:]
                    extracted_data["tables"].append({
                        "page": page_num + 1,
                        "headers": [str(h) if h else "" for h in headers],
                        "rows": [[str(cell) if cell else "" for cell in row] for row in rows]
                    })
                        
        return json.dumps(extracted_data, indent=2)
