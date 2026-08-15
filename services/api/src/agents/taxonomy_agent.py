import chromadb
from chromadb.config import Settings
from typing import Dict, Any

class TaxonomyAgent:
    """
    Connects to ChromaDB to classify and map B2B product taxonomies.
    """
    def __init__(self):
        import os
        from chromadb.utils import embedding_functions
        
        # Initialize persistent DB for production
        self.chroma_client = chromadb.PersistentClient(path="./chroma_db")
        
        google_api_key = os.getenv("GOOGLE_API_KEY")
        if google_api_key:
            self.embedding_fn = embedding_functions.GoogleGenerativeAiEmbeddingFunction(api_key=google_api_key)
        else:
            self.embedding_fn = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")
            
        self.collection = self.chroma_client.get_or_create_collection(
            name="taxonomy_unspc",
            embedding_function=self.embedding_fn
        )
        # Seed mock vectors
        self.collection.add(
            documents=["Variable Frequency Drives for AC motors", "Centrifugal Water Pumps"],
            metadatas=[{"code": "39122001", "name": "Variable Frequency Drives"}, {"code": "40151503", "name": "Centrifugal Pumps"}],
            ids=["id1", "id2"]
        )
        
    def classify(self, asset_name: str, attributes: list) -> Dict[str, Any]:
        """
        Uses semantic search to find the closest UNSPSC code and generates a B2B title.
        """
        # Querying based on a fake asset name or attributes
        query_text = asset_name.replace("_", " ").replace(".pdf", "")
        
        results = self.collection.query(
            query_texts=[query_text],
            n_results=1
        )
        
        taxonomy = {"code": "Unknown", "name": "Unknown", "confidence": 0.0}
        
        if results['metadatas'] and len(results['metadatas'][0]) > 0:
            meta = results['metadatas'][0][0]
            dist = results['distances'][0][0] if 'distances' in results and results['distances'] else 0.5
            # Convert distance to a mock confidence percentage
            confidence = max(50.0, 100.0 - (dist * 10))
            
            taxonomy = {
                "code": meta["code"],
                "name": meta["name"],
                "confidence": round(confidence, 1)
            }
            
        # Generate B2B Title Formula: [Brand] + [Specs] + [Type]
        brand = query_text.split(" ")[0] if " " in query_text else "Generic"
        power_spec = next((a["normalized"] for a in attributes if "Power" in a["key"] and a["valid"]), "")
        
        title = f"{brand} {power_spec} {taxonomy['name']}".strip()
        
        return {
            "taxonomy": taxonomy,
            "standardized_title": title
        }
