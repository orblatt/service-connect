from os import getenv

import uvicorn
import logging
from app import app

def setup_logging():
    logger = logging.getLogger('tipper')
    logger.setLevel(logging.DEBUG)
    handler = logging.StreamHandler()
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)


if __name__ == "__main__":
    setup_logging()
    host = getenv("HOST", "0.0.0.0")
    port = int(getenv("PORT", 8000))
    uvicorn.run(app, host=host, port=port)
