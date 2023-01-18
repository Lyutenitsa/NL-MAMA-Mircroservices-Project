from fastapi import Depends, APIRouter, Response, status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services import authService, user_service
from app.schemas import UserCredentials


router = APIRouter(
	prefix="/auth",
	tags=["authentication"],
	responses={404: {"description": "Not Found"}},
)


@router.post('/login')
def login(user_credentials: UserCredentials, db: Session = Depends(get_db)):
	
	if not authService.verify_user_credentials(user_credentials, db):
		raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Incorrect credentials")
	
	user = user_service.get_user_by_username(db, user_credentials.username)

	access_token = authService.create_access_token(
		data={
			"user_id": str(user.id),
			"username": user.username
		}
	)
	return {"access_token": access_token, "token_type": "Bearer"}

			