from email_validator import EmailNotValidError, validate_email
from pydantic import BaseModel, EmailStr, field_validator


class BaseUserSchema(BaseModel):
    """ """
    username: str
    email: EmailStr

    @classmethod
    @field_validator("username", "email")
    def not_empty(cls, v):
        """

        :param v: 

        """
        if not v:
            raise ValueError("must not be empty")
        return v

    @classmethod
    @field_validator("email")
    def valid_email(cls, email: EmailStr) -> EmailStr or ValueError:
        """

        :param email: EmailStr: 

        """
        try:
            # raises EmailNotValidError if invalid
            _ = validate_email(email, check_deliverability=False)
            return email
        except EmailNotValidError as e:
            raise ValueError(f"Invalid email: {email}") from e

    class Config:
        """ """
        orm_mode = True
