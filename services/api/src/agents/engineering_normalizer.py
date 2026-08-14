from pint import UnitRegistry
from pydantic import BaseModel, Field
import re
from typing import Optional

class NormalizedAttribute(BaseModel):
    original: str
    normalized_value: Optional[float]
    normalized_unit: Optional[str]
    is_valid: bool
    confidence: float
    error_reason: Optional[str] = None

class EngineeringNormalizerAgent:
    """
    Stage 2: Engineering Unit Normalization & Validation
    Antigravity Role: Calls deterministic Python validation functions via agent.register_tool().
    Open-Source Tech: Python pint (unit conversion) + pydantic.
    """
    def __init__(self):
        self.ureg = UnitRegistry()
        self.ureg.define('in = inch') # Ensure standard aliases
        
    def register_tool(self):
        return self.normalize_and_validate
        
    def normalize_and_validate(self, attribute_name: str, value_str: str) -> NormalizedAttribute:
        """
        Cleans dirty attributes and detects physical impossibilities.
        """
        # Clean common dirty inputs (e.g., 1/2 in -> 0.5 in, 0.5" -> 0.5 in, inches -> in)
        cleaned_str = value_str.lower().replace('"', ' in').replace('inches', 'in')
        
        # Handle fractions like 1/2
        fraction_match = re.search(r'(\d+)\/(\d+)', cleaned_str)
        if fraction_match:
            val = float(fraction_match.group(1)) / float(fraction_match.group(2))
            cleaned_str = re.sub(r'\d+\/\d+', str(val), cleaned_str)
            
        try:
            quantity = self.ureg.parse_expression(cleaned_str)
            
            # Detect physical impossibilities (e.g. Operating Temp > 1000 C for a standard electronic part)
            if 'temp' in attribute_name.lower():
                try:
                    temp_c = quantity.to('degC').magnitude
                    if temp_c > 1000 or temp_c < -273:
                        return NormalizedAttribute(
                            original=value_str, normalized_value=None, normalized_unit=None,
                            is_valid=False, confidence=0.0, error_reason="Physical impossibility: Temperature out of bounds."
                        )
                except Exception:
                    pass
                    
            return NormalizedAttribute(
                original=value_str,
                normalized_value=float(quantity.magnitude),
                normalized_unit=str(quantity.units),
                is_valid=True,
                confidence=100.0
            )
        except Exception as e:
            return NormalizedAttribute(
                original=value_str, normalized_value=None, normalized_unit=None,
                is_valid=False, confidence=40.0, error_reason=f"Failed to parse or validate: {str(e)}"
            )
