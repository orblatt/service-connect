from pydantic import validator

from .base_user_schema import BaseUserSchema


class UserRequestSchema(BaseUserSchema):
    """ """
    password: str

    @classmethod
    @validator("password")
    def not_empty(cls, v):
        """

        :param v:

        """
        if not v:
            raise ValueError("must not be empty")
        return v
