import logging
from threading import Lock

from configs.default import db_config
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()


class DatabaseConnection:
    """ """
    _instance = None
    _lock = Lock()
    _session = None
    _engine = None

    def __new__(cls):
        """
        Singleton pattern to ensure only one instance of the database connection is created
        """
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:  # Double-checked locking
                    cls._instance = super(DatabaseConnection, cls).__new__(cls)
                    cls._setup_database()
        return cls._instance

    @classmethod
    def _setup_database(cls) -> None:
        """Setup the database connection
        :return:


        """
        cls._engine = create_engine(
            "postgresql://{username}:{password}@{endpoint}:{port}/{dbname}".
            format(**db_config))
        Base.metadata.create_all(cls._engine)
        cls._session = sessionmaker(bind=cls._engine)()
        logging.info("Database engine created")

    @classmethod
    def get_instance(cls):
        """ """
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    @classmethod
    def close_session(cls):
        """
        Close the current session
        """
        cls._session.close()
        logging.info( "Session closed")

    @classmethod
    def close_engine(cls):
        """
        Properly dispose the engine and connections
        """
        cls._engine.dispose()
        logging.info("Database engine disposed")
