import logging

from fastapi import APIRouter, Body, Depends, HTTPException, status
from modules.user_operations import UserOperations
from schemas.user_request_schema import UserRequestSchema
from schemas.user_response_schema import UserResponseSchema
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from tables.user import User

user_router = APIRouter()


@user_router.post("/users/", response_model=UserResponseSchema)
async def create_user(
    user: UserRequestSchema = Body(...),
    user_operations: UserOperations = Depends(lambda: UserOperations.get_instance()),
):
    try:
        input_user: User = User(**user.dict())
        response_user: User = user_operations.add_user(input_user)
        return response_user.to_dict(exclude=["password"])
    except ValueError as e:
        logging.error(f"Value error: {str(e)}")
        detail = {"error": str(e), "error_type": "value"}
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)
    except IntegrityError as e:
        logging.error(f"Integrity error: {str(e)}")
        detail = {
            "error": "This user may already exist or violate constraints.",
            "error_type": "integrity",
        }
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)
    except SQLAlchemyError as e:
        logging.error(f"Database error: {str(e)}")
        detail = {"error": str(e), "error_type": "database"}
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=detail
        )
    except Exception as e:
        logging.error(f"Unknown error: {str(e)}")
        detail = {"error": str(e), "error_type": "unknown"}
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=detail
        )
