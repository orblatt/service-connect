from sqlalchemy import Column, String, Integer, inspect
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import object_mapper


Base = declarative_base()


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, unique=True, primary_key=True)
    username = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)

    @property
    def non_nullable_fields(self):
        """Returns a list of non-nullable field names, excluding the primary key."""
        return [column.name for column in inspect(self.__class__).columns if
                not column.nullable and column.name != 'id']

    def to_dict(self, exclude=[]) -> dict:
        """Return a dictionary representation of the model, optionally excluding specified fields."""
        data = {column.key: getattr(self, column.key)
                for column in object_mapper(self).columns
                if column.key not in exclude}
        return data
