from .base_user_schema import BaseUserSchema


class UserResponseSchema(BaseUserSchema):
    id: int  # include id in response
