from database_connection.database_connection import DatabaseConnection
from sqlalchemy.exc import IntegrityError
from sqlalchemy.exc import SQLAlchemyError
from tables.user import User


class UserOperations(DatabaseConnection):
    """ """

    def get_user_by_id(self, user_id: int) -> User or None:
        """

        :param user_id: int:

        """
        try:
            return self._session.query(User).filter(User.id == user_id).first()
        except Exception as e:
            self._session.rollback()
            raise e
        finally:
            self.close_session()

    def get_user_by_email(self, email: str) -> User or None:
        """

        :param email: str:

        """
        try:
            return self._session.query(User).filter(User.email == email).first()
        except Exception as e:
            self._session.rollback()
            raise e
        finally:
            self.close_session()

    def update_user(self, user_id: int, **kwargs) -> User or None:
        """Update a user's information in the database

        :param user_id: int:
        :param **kwargs:

        """
        user = self.get_user_by_id(user_id)
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
                self._session.commit()
            except SQLAlchemyError as e:
                self._session.rollback()
                raise ValueError(
                    f"An error occurred while updating the user: {str(e)}")
            except Exception as e:
                self._session.rollback()
                raise e
            finally:
                self.close_session()
        return user

    def delete_user(self, user_id: int) -> bool:
        """Remove a user from the database.

        :param user_id: int:

        """
        user = self.get_user_by_id(user_id)
        if user is not None:
            try:
                self._session.delete(user)
                self._session.commit()
                return True
            except Exception as e:
                self._session.rollback()
                return False
            finally:
                self.close_session()
        return False

    def add_user(self, user: User) -> User or ValueError or Exception:
        """Add a new user to the database.

        :param user: User:

        """
        self._check_missing_or_null_fields(user)
        valid_attrs = self._validate_attributes(user)
        return self._create_and_save_user(valid_attrs)

    def _check_missing_or_null_fields(self, user: User) -> None or ValueError:
        """

        :param user: User:

        """
        missing_or_null_fields = [
            field for field in User().non_nullable_fields
            if user.__dict__.get(field) is None
        ]
        if missing_or_null_fields:
            raise ValueError(
                f"Missing or null fields for non-nullable columns: {', '.join(missing_or_null_fields)}"
            )

    def _validate_attributes(self, user: User) -> dict or ValueError:
        """

        :param user: User:

        """
        user_obj = user.to_dict(exclude=["id"])
        valid_attrs: User = {
            key: value
            for key, value in user_obj.items()
            if hasattr(User, key) and value is not None
        }
        if len(valid_attrs) != len(user_obj):
            unknown_fields = set(user_obj) - set(valid_attrs)
            raise ValueError(
                f"Some fields either do not exist on the User model or were null: {', '.join(unknown_fields)}"
            )
        return valid_attrs

    def _create_and_save_user(
            self, valid_attrs: User) -> User or ValueError or Exception:
        """

        :param valid_attrs: User:

        """
        new_user = User(**valid_attrs)
        self._session.add(new_user)
        try:
            self._session.commit()
            return new_user
        except IntegrityError:
            self._session.rollback()
            raise ValueError("A user with this email already exists.")
        except Exception as e:
            self._session.rollback()
            raise Exception(
                f"An unexpected error occurred while adding a user. Error: {str(e)}"
            )
