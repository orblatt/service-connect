from fastapi import FastAPI, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from endpoints.v1.users_endpoint import user_router

# from .endpoints.v1.jobs_endpoint import jobs_router  # TODO: implement jobs_router

app = FastAPI()

app.include_router(user_router, prefix="/v1")
# app.include_router(job_router, prefix="/v1")  # TODO: implement jobs_router


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=jsonable_encoder({"detail": exc.errors()}),
    )
