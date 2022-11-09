from typing import Any
from fastapi import HTTPException, status
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import models, schemas
from app.services import utils


def user_exist_by_id(db: Session, id: str) -> bool:
	db_user = get_user_by_id(db, id)
	if db_user:
		return True
	else:
		return False


def user_exists_by_username(db: Session, username: str) -> bool:
	db_user = get_user_by_username(db, username)
	if db_user:
		return True
	else:
		return False


def get_all_users(db: Session):
	return db.query(models.User).all()


def get_user_by_id(db: Session, id: str):
	return db.query(models.User).filter(models.User.id == id).first()


def get_user_by_username(db: Session, username: str):
	db_user = db.query(models.User).filter(models.User.username == username).first()
	return db_user


def save_new_user(db: Session, new_user: schemas.UserIn):
	new_user.password = utils.hash_password(new_user.password)
	user_to_save = models.User(**jsonable_encoder(new_user))
	
	db.add(user_to_save)
	db.commit()
	db.refresh(user_to_save)
	
	return user_to_save


def update_user(db: Session, user_to_update: schemas.UserIn, id: str):
	user_query = db.query(models.User).filter(models.User.id == id)
	
	user_query.update(jsonable_encoder(user_to_update))
	
	db.commit()
	return user_query.first()


def delete_user(db: Session, id: str):
	user_to_delete = get_user_by_id(db, id)
	
	db.delete(user_to_delete)
	db.commit()
	return user_to_delete
