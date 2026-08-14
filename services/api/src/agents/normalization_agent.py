import pint
import re
from typing import Dict, Any

class EngineeringNormalizationAgent:
    """
    Agent that normalizes engineering units using `pint`.
    """
    def __init__(self):
        self.ureg = pint.UnitRegistry()
        
    def normalize(self, attributes: list) -> list:
        normalized_attrs = []
        
        for attr in attributes:
            orig = attr.get("original", "")
            key = attr.get("key", "")
            
            norm_val = orig
            is_valid = True
            error_msg = None
            
            # Simulated normalization rules based on Key
            try:
                if "Voltage" in key:
                    # Clean e.g. "400-480 V" -> take max "480 V"
                    match = re.search(r'(\d+)\s*V', orig, re.IGNORECASE)
                    if match:
                        norm_val = f"{float(match.group(1))} V"
                elif "Power" in key:
                    match = re.search(r'(\d+)\s*kW', orig, re.IGNORECASE)
                    if match:
                        norm_val = f"{float(match.group(1))} kW"
                elif "Temp" in key:
                    match = re.search(r'(\d+)\s*C', orig, re.IGNORECASE)
                    if match:
                        temp_val = float(match.group(1))
                        if temp_val > 1000: # Physical Impossibility Rule
                            is_valid = False
                            error_msg = "Temperature out of bounds. (Physical Impossibility)"
                            norm_val = "None"
                        else:
                            norm_val = f"{temp_val} C"
                elif "Flow" in key:
                    # E.g. "150-185 GPM" -> average
                    match = re.findall(r'\d+', orig)
                    if len(match) == 2:
                        avg = (float(match[0]) + float(match[1])) / 2
                        norm_val = f"{avg} GPM"
                    
            except Exception as e:
                is_valid = False
                error_msg = f"Parsing error: {str(e)}"
                
            attr["normalized"] = norm_val
            attr["valid"] = is_valid
            attr["error"] = error_msg
            normalized_attrs.append(attr)
            
        return normalized_attrs
