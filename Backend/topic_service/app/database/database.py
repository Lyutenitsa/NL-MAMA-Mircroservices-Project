import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from ..config import settings

if os.getenv("DATABASE_URL"):
	SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

else:
	SQLALCHEMY_DATABASE_URL = f"postgresql://{settings.database_username}:" \
	                          f"{settings.database_password}" \
	                          f"@{settings.database_host}:" \
	                          f"{settings.database_port}" \
	                          f"/{settings.database_name}"

print(SQLALCHEMY_DATABASE_URL)

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()
