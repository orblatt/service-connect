import uvicorn
from app import app
from os import getenv


if __name__ == "__main__":
    host = getenv("HOST", "0.0.0.0")
    port = int(getenv("PORT", 8000))
    uvicorn.run(app, host=host, port=port)
