from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from typing import Type

from ..tables.user import User
from ..database_connection.database_connection import DatabaseConnection


class UserOperations(DatabaseConnection):
    def add_user(self, **kwargs) -> User:
        """
        Add a new user to the database.
        """
        missing_or_null_fields = [field for field in User().non_nullable_fields if kwargs.get(field) is None]
        if missing_or_null_fields:
            raise ValueError(f"Missing or null fields for non-nullable columns: {', '.join(missing_or_null_fields)}")

        # Validate that all provided attributes exist on the User class
        valid_attrs = {key: value for key, value in kwargs.items() if hasattr(User, key) and value is not None}
        if len(valid_attrs) != len(kwargs):
            unknown_fields = set(kwargs) - set(valid_attrs)
            raise ValueError(
                f"Some fields either do not exist on the User model or were null: {', '.join(unknown_fields)}")
        # Create a new User instance with validated attributes
        new_user = User(**valid_attrs)
        self.session.add(new_user)
        try:
            self.session.commit()
            return new_user
        except IntegrityError:
            self.session.rollback()
            raise ValueError("A user with this email already exists.")
        except Exception as e:
            self.session.rollback()
            raise Exception(f"An unexpected error occurred while adding a user. Error: {str(e)}")

    def get_user(self, user_id: str) -> User or None:
        return self.session.query(User).filter(User.id == user_id).first()

    def update_user(self, user_id, **kwargs) -> User or None:
        """
        Update an existing user's details.
        """
        user = self.get_user(user_id)
        if not user:
            return None

        update_data = {}
        for key, value in kwargs.items():
            if hasattr(User, key) and value is not None:
                update_data[key] = value

        if update_data:
            try:
                for key, value in update_data.items():
                    setattr(user, key, value)
                self.session.commit()
            except SQLAlchemyError as e:
                self.session.rollback()
                raise ValueError(f"An error occurred while updating the user: {str(e)}")
        return user

    def delete_user(self, user_id: str) -> bool:
        """
        Remove a user from the database.
        """
        user = self.get_user(user_id)
        if user is not None:
            user.delete()
            self.session.commit()
            return True
        return False
