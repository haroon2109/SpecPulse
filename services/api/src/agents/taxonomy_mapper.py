class TaxonomyMappingAgent:
    """
    Stage 3: Autonomous Taxonomy & E-Commerce Enrichment
    Antigravity Role: Matches extracted specs against industrial taxonomies.
    Modified to use simple string matching instead of ChromaDB for low memory usage.
    """
    def __init__(self):
        self.taxonomy_data = [
            {"name": "Variable Frequency Drives", "code": "39122001", "type": "UNSPSC"},
            {"name": "Digital Multimeters", "code": "41113630", "type": "UNSPSC"},
            {"name": "Induction Motors", "code": "26101112", "type": "UNSPSC"},
            {"name": "Programmable Logic Controllers", "code": "32151705", "type": "UNSPSC"}
        ]
        
    def generate_b2b_title(self, brand: str, series: str, primary_spec: str, product_type: str) -> str:
        """
        Generates standardized B2B titles using the formula:
        Title = [Brand] + [Series] + [Primary Spec] + [Product Type]
        """
        parts = [p for p in [brand, series, primary_spec, product_type] if p]
        return " ".join(parts)
        
    def map_product(self, extracted_text: str, product_metadata: dict) -> dict:
        query = extracted_text.lower()
        
        best_match = None
        best_score = 0
        
        for item in self.taxonomy_data:
            # Simple word match scoring
            words = item["name"].lower().split()
            score = sum(1 for w in words if w in query)
            if score > best_score:
                best_score = score
                best_match = item
                
        confidence = 0.0
        mapped_category = None
        mapped_code = None
        
        if best_match and best_score > 0:
            confidence = min(95.0, 50.0 + (best_score * 15.0))
            mapped_category = best_match["name"]
            mapped_code = best_match["code"]

        generated_title = self.generate_b2b_title(
            brand=product_metadata.get("brand", ""),
            series=product_metadata.get("series", ""),
            primary_spec=product_metadata.get("primary_spec", ""),
            product_type=mapped_category or product_metadata.get("product_type", "")
        )
            
        return {
            "assigned_taxonomy": mapped_category,
            "taxonomy_code": mapped_code,
            "taxonomy_system": "UNSPSC",
            "confidence": confidence,
            "standardized_title": generated_title
        }
