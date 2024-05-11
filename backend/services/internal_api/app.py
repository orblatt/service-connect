import logging
import sys
from fastapi import FastAPI
from fastapi import Request
from fastapi import status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from endpoints.v1.users_endpoint import user_router
from database_connection.database_connection import DatabaseConnection
from fastapi.middleware.cors import CORSMiddleware

# from .endpoints.v1.jobs_endpoint import jobs_router  # TODO: implement jobs_router

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
app = FastAPI()
app.include_router(user_router, prefix="/v1")
# app.include_router(job_router, prefix="/v1")  # TODO: implement jobs_router

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Specify the correct origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    logging.info("Starting up the application")
    try:
        _ = DatabaseConnection.get_instance()
    except Exception as e:
        sys.exit(f"Failed to initialize database connection. Error: {str(e)}")


@app.on_event("shutdown")
async def shutdown_event():
    logging.info("Shutting down the application")
    # Properly dispose the engine when the application shuts down
    DatabaseConnection.close_engine()


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=jsonable_encoder({"detail": exc.errors()}),
    )
