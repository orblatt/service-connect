from fastapi import FastAPI, HTTPException
from .routes import api

app = FastAPI(title="Israeli Corporations Service")

# Include routes from the api module
app.include_router(api.router)