import logging
import sys
import json
from datetime import datetime

class JsonFormatter(logging.Formatter):
    def format(self, record):
        log_record = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }
        if hasattr(record, "client_ip"):
            log_record["client_ip"] = record.client_ip
        if hasattr(record, "user_email"):
            log_record["user_email"] = record.user_email
        if record.exc_info:
            log_record["exc_info"] = self.formatException(record.exc_info)
        return json.dumps(log_record)

def setup_logger(name: str):
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    
    # Avoid duplicating handlers if setup_logger is called multiple times
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        # Use JSON formatter for structured logging suitable for production log aggregators
        handler.setFormatter(JsonFormatter())
        logger.addHandler(handler)
        
    return logger

security_logger = setup_logger("security")
traffic_logger = setup_logger("traffic")
app_logger = setup_logger("app")
