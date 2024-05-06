from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from threading import Lock
from typing import Type

from ..configs.default import db_config
from ..tables.users import Users


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
        engine = create_engine(f"postgresql://{db_config['user']}:{db_config['password']}@{db_config['endpoint']}:{db_config['port']}/{db_config['dbname']}")
        Base.metadata.create_all(engine)
        cls.session = sessionmaker(bind=engine)()

    def add_user(self, name, email, password) -> None:
        """
        Add a user to the database
        :param name:
        :param email:
        :param password:
        :return:
        """
        self.session.add(Users(name=name, email=email, password=password))
        self.session.commit()

    def get_user(self, user_id) -> Type[Users]:
        """
        Get a user from the database
        :param user_id:
        :return:
        """
        return self.session.query(Users).filter(Users.id == user_id).first()