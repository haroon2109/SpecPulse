class AuditHITLGate:
    """
    Stage 4: Explainability & Safety Gate (The Finale Shortlist Trigger)
    Antigravity Role: Utilizes declarative policy hooks (ask_user / deny).
    """
    def __init__(self, confidence_threshold=80.0):
        self.confidence_threshold = confidence_threshold
        
    def _ask_user(self, reasons: list) -> dict:
        """Declarative policy hook to trigger HITL review."""
        return {
            "status": "HITL_TRIGGERED",
            "action": "ask_user",
            "reasons": reasons
        }
        
    def _deny(self, reasons: list) -> dict:
        """Declarative policy hook to reject extraction completely."""
        return {
            "status": "DENIED",
            "action": "deny",
            "reasons": reasons
        }
        
    def _approve(self, score: float) -> dict:
        return {
            "status": "APPROVED",
            "action": "commit_to_db",
            "final_score": score
        }

    def evaluate(self, extraction_results: list, taxonomy_result: dict) -> dict:
        """
        Computes a Confidence Score (0–100%) for each attribute. 
        If any field drops below 80% confidence or violates physical logic, 
        Antigravity triggers a Human-in-the-Loop review prompt.
        """
        reasons = []
        overall_confidence_sum = taxonomy_result.get("confidence", 100.0)
        total_items = 1
        
        # Check taxonomy confidence
        if taxonomy_result.get("confidence", 0) < self.confidence_threshold:
            reasons.append(f"Taxonomy mapping confidence ({taxonomy_result.get('confidence')}%) is below 80% threshold.")
            
        # Check all extracted and normalized attributes
        for attr in extraction_results:
            attr_conf = attr.get('confidence', 100.0)
            overall_confidence_sum += attr_conf
            total_items += 1
            
            if not attr.get('is_valid', True):
                # Physical logic violation triggers ask_user or deny
                reasons.append(f"Physical logic violation on '{attr.get('key', 'unknown')}': {attr.get('error_reason')}")
            elif attr_conf < self.confidence_threshold:
                reasons.append(f"Attribute '{attr.get('key', 'unknown')}' confidence ({attr_conf}%) is below 80%.")
                
        average_confidence = overall_confidence_sum / total_items
        
        # Policy Routing
        if any("Physical impossibility" in r for r in reasons):
            return self._deny(reasons)
        elif len(reasons) > 0:
            return self._ask_user(reasons)
        else:
            return self._approve(average_confidence)
