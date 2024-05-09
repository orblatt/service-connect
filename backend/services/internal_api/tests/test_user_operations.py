import pytest

from ..modules.user_operations import UserOperations

db_connection = UserOperations()

mock_existing_user = {"username": "test", "email": "test", "password": "test"}

mock_new_user = {
    "username": "test_new",
    "email": "test_new@example.com",
    "password": "test_new_password",
}


def test_add_user_new_user():
    """ """
    user = db_connection.add_user(mock_new_user)
    assert user.username == mock_new_user["username"]
    assert user.email == mock_new_user["email"]
    assert user.password == mock_new_user["password"]


def test_get_user():
    """ """
    user = db_connection.get_user_by_email(mock_existing_user["email"])
    user2 = db_connection.get_user_by_id(user.id)
    assert user == user2
    assert user.username == mock_existing_user["username"]
    assert user.email == mock_existing_user["email"]
    assert user.password == mock_existing_user["password"]


def test_add_user_existing_user():
    """ """
    with pytest.raises(ValueError) as e:
        db_connection.add_user(mock_existing_user)
    assert str(e.value) == "A user with this email already exists."


def test_update_user():
    """ """
    mock_username = "test_updated"
    user = db_connection.get_user_by_email(mock_new_user["email"])
    user = db_connection.update_user(user.id, username=mock_username)
    assert user.username == mock_username
    # return to original state
    user = db_connection.update_user(user.id, username=mock_new_user["username"])
    assert user.username == mock_new_user["username"]


def test_delete_user():
    """ """
    user = db_connection.get_user_by_email(mock_new_user["email"])
    assert db_connection.delete_user(user.id) is True
    assert db_connection.delete_user(-1) is False
