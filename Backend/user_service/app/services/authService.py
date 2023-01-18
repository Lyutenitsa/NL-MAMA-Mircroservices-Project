from typing import Any
from fastapi import HTTPException, status, Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import models, schemas
from app.database.database import get_db
from app.config import settings
from app.services import utils, user_service
from fastapi.security.oauth2 import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta
from app.schemas import UserCredentials

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')

SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes


credentials_exception = HTTPException(
		status_code=status.HTTP_401_UNAUTHORIZED,
		detail=f"Could not validate credentials",
		headers={"WWW-Authenticate": "Bearer"})


def create_access_token(data: dict):
	to_encode = data.copy()
	
	expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
	to_encode.update({"exp": expire})
	
	encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
	
	return encoded_jwt


def verify_user_credentials(user_credentials: UserCredentials, db: Session):
	db_user = user_service.get_user_by_username(db, user_credentials.username)
	
	if not db_user:
		return False
	elif utils.verify_password(user_credentials.password, db_user.password):
		return True
	else:
		return False


def verify_access_token(token: str):
	try:
		payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
		id: str = payload.get("user_id")
		if id is None:
			raise credentials_exception
		token_data = schemas.TokenData(id=id)
	except JWTError:
		raise credentials_exception
	
	return token_data


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
	
	token = verify_access_token(token)
	
	user = db.query(models.User).filter(models.User.id == token.id).first()
	if not user:
		raise credentials_exception
	return user
