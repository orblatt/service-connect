from sqlalchemy import Column, String, Integer, inspect
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, unique=True, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)

    @property
    def non_nullable_fields(self):
        """Returns a list of non-nullable field names, excluding the primary key."""
        return [column.name for column in inspect(self.__class__).columns if
                not column.nullable and column.name != 'id']

