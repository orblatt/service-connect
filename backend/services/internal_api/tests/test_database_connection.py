import pytest
from unittest.mock import patch, MagicMock
from sqlalchemy.engine import Engine
from services.internal-api.database_connection.database_connection import DatabaseConnection

# Mock configuration to use in tests
mock_db_config = {
    'user': 'test_user',
    'password': 'test_password',
    'endpoint': 'localhost',
    'port': '5432',
    'dbname': 'test_db'
}

@pytest.fixture
def mock_engine():
    with patch('sqlalchemy.create_engine') as mock:
        yield mock

@pytest.fixture
def mock_sessionmaker():
    with patch('sqlalchemy.orm.sessionmaker') as mock:
        mock.return_value = MagicMock()  # This will be the sessionmaker class
        mock.return_value.return_value = MagicMock()  # This will be the session object
        yield mock

@pytest.fixture
def mock_metadata():
    with patch('sqlalchemy.ext.declarative.declarative_base().metadata.create_all') as mock:
        yield mock

def test_singleton_pattern():
    instance1 = DatabaseConnection()
    instance2 = DatabaseConnection()
    assert instance1 is instance2, "DatabaseConnection does not follow the singleton pattern"

@patch.dict('..configs.default.db_config', mock_db_config)
def test_database_setup(mock_engine, mock_sessionmaker, mock_metadata):
    # Assuming _setup_database method is accessible for the test. If it's private, consider testing its effects indirectly via the constructor.
    DatabaseConnection._setup_database()  # This is called upon creation in the actual implementation
    mock_engine.assert_called_once_with(f"postgresql://{mock_db_config['user']}:{mock_db_config['password']}@{mock_db_config['endpoint']}:{mock_db_config['port']}/{mock_db_config['dbname']}")
    mock_metadata.assert_called_once()
    mock_sessionmaker.assert_called_once_with(bind=MagicMock(spec=Engine))
    assert isinstance(DatabaseConnection.session, MagicMock), "Session should be initialized"

@pytest.fixture(autouse=True)
def reset_singleton():
    # This fixture is used to reset the singleton instance for each test, ensuring test isolation
    DatabaseConnection._instance = None
    yield
