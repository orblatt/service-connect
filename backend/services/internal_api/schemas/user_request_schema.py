from pydantic import field_validator

from .base_user_schema import BaseUserSchema


class UserRequestSchema(BaseUserSchema):
    password: str

    @classmethod
    @field_validator('password')
    def not_empty(cls, v):
        if not v:
            raise ValueError('must not be empty')
        return v
