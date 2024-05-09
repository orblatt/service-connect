from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from threading import Lock

from configs.default import db_config


Base = declarative_base()


class DatabaseConnection:
    _instance = None
    _lock = Lock()

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
        """
        Setup the database connection
        :return:
        """
        engine = create_engine(
            "postgresql://{username}:{password}@{endpoint}:{port}/{dbname}".format(
                **db_config
            )
        )
        Base.metadata.create_all(engine)
        cls.session = sessionmaker(bind=engine)()

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance
