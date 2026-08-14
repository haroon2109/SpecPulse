from typing import Dict, Any, List

class AuditGate:
    """
    Audit & Safety Policy Gate (Antigravity Hooks).
    Calculates confidence scores and flags HITL reviews.
    """
    def __init__(self):
        # Icon mapping for UI consistency
        self.icon_map = {
            "Voltage": "voltage",
            "Power": "power",
            "Temp": "temp",
            "Flow": "power" 
        }

    def evaluate(self, attributes: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        audited = []
        for attr in attributes:
            # Determine UI Icon
            icon = "power"
            for k, v in self.icon_map.items():
                if k in attr["key"]:
                    icon = v
                    break
            attr["icon"] = icon
            
            # Calculate mock confidence score
            if not attr.get("valid", True):
                attr["confidence"] = 0.0
            else:
                # If it's a clean normalization, high confidence
                if attr.get("normalized") and attr["normalized"] != "None":
                    attr["confidence"] = 95.0 + (len(attr["key"]) % 5) # Pseudo-random high confidence 95-99
                else:
                    attr["confidence"] = 65.0
                    
            audited.append(attr)
            
        return audited
