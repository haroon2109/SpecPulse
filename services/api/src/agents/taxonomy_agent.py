import os
from typing import Dict, Any

class TaxonomyAgent:
    """
    Classifies and maps B2B product taxonomies using simple matching to save memory.
    """
    def __init__(self):
        # Mock taxonomy database
        self.taxonomy_db = [
            {
                "keywords": ["variable frequency drive", "vfd", "ac motor"],
                "code": "39122001",
                "name": "Variable Frequency Drives"
            },
            {
                "keywords": ["centrifugal pump", "water pump"],
                "code": "40151503",
                "name": "Centrifugal Pumps"
            }
        ]
        
    def classify(self, asset_name: str, attributes: list) -> Dict[str, Any]:
        """
        Uses simple keyword search to find the closest UNSPSC code and generates a B2B title.
        """
        query_text = asset_name.replace("_", " ").replace(".pdf", "").lower()
        
        taxonomy = {"code": "Unknown", "name": "Unknown", "confidence": 0.0}
        
        # Simple keyword matching
        best_match = None
        best_score = 0
        
        for item in self.taxonomy_db:
            score = sum(1 for kw in item["keywords"] if kw in query_text)
            if score > best_score:
                best_score = score
                best_match = item
                
        if best_match:
            # Fake confidence based on match
            confidence = min(95.0, 50.0 + (best_score * 15.0))
            taxonomy = {
                "code": best_match["code"],
                "name": best_match["name"],
                "confidence": round(confidence, 1)
            }
            
        # Generate B2B Title Formula: [Brand] + [Specs] + [Type]
        brand_parts = asset_name.replace("_", " ").replace(".pdf", "").split(" ")
        brand = brand_parts[0] if brand_parts else "Generic"
        power_spec = next((a["normalized"] for a in attributes if "Power" in a.get("key", "") and a.get("valid")), "")
        
        title = f"{brand} {power_spec} {taxonomy['name']}".strip()
        
        return {
            "taxonomy": taxonomy,
            "standardized_title": title
        }
