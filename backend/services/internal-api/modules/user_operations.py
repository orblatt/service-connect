from sqlalchemy.exc import IntegrityError, SQLAlchemyError

from ..tables.user import User
from ..database_connection.database_connection import DatabaseConnection


class UserOperations(DatabaseConnection):

    def get_user(self, user_id: str) -> User or None:
        return self.session.query(User).filter(User.id == user_id).first()

    def update_user(self, user_id: str, **kwargs) -> User or None:
        """
        Update a user's information in the database
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

    def add_user(self, **kwargs) -> User or ValueError or Exception:
        """
        Add a new user to the database.
        """
        self._check_missing_or_null_fields(kwargs)
        valid_attrs = self._validate_attributes(kwargs)
        return self._create_and_save_user(valid_attrs)

    def _check_missing_or_null_fields(self, kwargs: dict) -> None or ValueError:
        missing_or_null_fields = [field for field in User().non_nullable_fields if kwargs.get(field) is None]
        if missing_or_null_fields:
            raise ValueError(f"Missing or null fields for non-nullable columns: {', '.join(missing_or_null_fields)}")

    def _validate_attributes(self, kwargs: dict) -> dict or ValueError:
        valid_attrs = {key: value for key, value in kwargs.items() if hasattr(User, key) and value is not None}
        if len(valid_attrs) != len(kwargs):
            unknown_fields = set(kwargs) - set(valid_attrs)
            raise ValueError(
                f"Some fields either do not exist on the User model or were null: {', '.join(unknown_fields)}")
        return valid_attrs

    def _create_and_save_user(self, valid_attrs: dict) -> User or ValueError or Exception:
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