import chromadb
from chromadb.utils import embedding_functions

class TaxonomyMappingAgent:
    """
    Stage 3: Autonomous Taxonomy & E-Commerce Enrichment
    Antigravity Role: Matches extracted specs against industrial taxonomies.
    Open-Source Tech: ChromaDB + sentence-transformers.
    """
    def __init__(self):
        import os
        self.chroma_client = chromadb.Client()
        google_api_key = os.getenv("GOOGLE_API_KEY")
        
        if google_api_key:
            # Use Google's API to offload the heavy AI model from Render's limited memory
            self.embedding_fn = embedding_functions.GoogleGenerativeAiEmbeddingFunction(
                api_key=google_api_key,
                model_name="models/text-embedding-004"
            )
        else:
            # Fallback to local model (will cause OOM on Render 512MB free tier)
            self.embedding_fn = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")
            
        self.collection = self.chroma_client.get_or_create_collection(
            name="b2b_taxonomy", 
            embedding_function=self.embedding_fn
        )
        self._seed_taxonomy()
        
    def _seed_taxonomy(self):
        categories = ["Variable Frequency Drives", "Digital Multimeters", "Induction Motors", "Programmable Logic Controllers"]
        codes = ["39122001", "41113630", "26101112", "32151705"]
        self.collection.add(
            documents=categories,
            metadatas=[{"code": code, "type": "UNSPSC"} for code in codes],
            ids=[f"tax_{i}" for i in range(len(categories))]
        )
        
    def generate_b2b_title(self, brand: str, series: str, primary_spec: str, product_type: str) -> str:
        """
        Generates standardized B2B titles using the formula:
        Title = [Brand] + [Series] + [Primary Spec] + [Product Type]
        """
        parts = [p for p in [brand, series, primary_spec, product_type] if p]
        return " ".join(parts)
        
    def map_product(self, extracted_text: str, product_metadata: dict) -> dict:
        results = self.collection.query(
            query_texts=[extracted_text],
            n_results=1
        )
        
        confidence = 0.0
        mapped_category = None
        mapped_code = None
        
        if results['distances'] and len(results['distances'][0]) > 0:
            distance = results['distances'][0][0]
            confidence = max(0.0, 100.0 - (distance * 100))
            mapped_category = results['documents'][0][0]
            mapped_code = results['metadatas'][0][0]['code']

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
