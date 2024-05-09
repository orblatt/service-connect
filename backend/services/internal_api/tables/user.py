from sqlalchemy import Column
from sqlalchemy import inspect
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import object_mapper

Base = declarative_base()


class User(Base):
    """ """
    __tablename__ = "users"
    id = Column(Integer, unique=True, primary_key=True)
    username = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)

    @property
    def non_nullable_fields(self):
        """Returns a list of non-nullable field names, excluding the primary key."""
        return [
            column.name for column in inspect(self.__class__).columns
            if not column.nullable and column.name != "id"
        ]

    def to_dict(self, exclude=[]) -> dict:
        """

        :param exclude:  (Default value = [])

        """
        data = {
            column.key: getattr(self, column.key)
            for column in object_mapper(self).columns
            if column.key not in exclude
        }
        return data
