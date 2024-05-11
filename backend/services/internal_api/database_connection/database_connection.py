import logging
from threading import Lock

from configs.default import db_config
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()


class DatabaseConnection:
    """ """
    _instances = {}
    _lock = Lock()
    _session = None
    _engine = None

    def __new__(cls):
        """
        Singleton pattern to ensure only one instance of the database connection is created
        """
        with cls._lock:
            if cls not in cls._instances:
                instance = super(DatabaseConnection, cls).__new__(cls)
                cls._setup_database()  # Ensure database is setup during instantiation
                cls._instances[cls] = instance
        return cls._instances[cls]

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
        return cls.__new__(cls)

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
