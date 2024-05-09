from pydantic import BaseModel, EmailStr, field_validator
from email_validator import validate_email, EmailNotValidError


class BaseUserSchema(BaseModel):
    username: str
    email: EmailStr

    @classmethod
    @field_validator("username", "email")
    def not_empty(cls, v):
        if not v:
            raise ValueError("must not be empty")
        return v

    @classmethod
    @field_validator("email")
    def valid_email(cls, email: EmailStr) -> EmailStr or ValueError:
        try:
            # raises EmailNotValidError if invalid
            _ = validate_email(email, check_deliverability=False)
            return email
        except EmailNotValidError as e:
            raise ValueError(f"Invalid email: {email}") from e

    class Config:
        orm_mode = True
