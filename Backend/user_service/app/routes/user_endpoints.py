from fastapi import Depends, APIRouter, Response, HTTPException, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app import schemas
from app.services import user_service

router = APIRouter(
	prefix="/user",
	tags=["user"],
	responses={404: {"description": "Not Found"}},
)


def id_not_found_exception(id):
	return HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail=f"User with id= {id} not found"
		)


# @router.get("/", response_model=List[schemas.UserOut], status_code=status.HTTP_200_OK)
# def get_all_users(db: Session = Depends(get_db), user_id: int = Depends(authService.get_current_user)):
# 	print(user_id)
# 	return user_service.get_all_users(db)


@router.get("/{id}", response_model=schemas.UserOut, status_code=status.HTTP_200_OK)
def get_user(id: str, db: Session = Depends(get_db), ):
	user_exists = user_service.user_exist_by_id(db, id)
	if not user_exists:
		raise id_not_found_exception
	
	db_user = user_service.get_user_by_id(db, id)
	return db_user


@router.post("/", response_model=schemas.UserOut, status_code=status.HTTP_201_CREATED)
def create_user(new_user: schemas.UserIn, db: Session = Depends(get_db), ):
	if user_service.user_exists_by_username(db, new_user.username):
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="User with this username already exists in the system"
		)
	else:
		db_user = user_service.save_new_user(db, new_user)
	
	return db_user


@router.put("/{id}", response_model=schemas.UserOut, status_code=status.HTTP_200_OK)
def update_user(user_to_update: schemas.UserIn, id: str, db: Session = Depends(get_db)):
	user_exists = user_service.user_exist_by_id(db, id)
	if not user_exists:
		raise id_not_found_exception
	
	db_user = user_service.update_user(db, user_to_update, id)
	return db_user


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(id: str, db: Session = Depends(get_db), ):
	user_exists = user_service.user_exist_by_id(db, id)
	if not user_exists:
		raise id_not_found_exception
	
	user_service.delete_user(db, id)
	return Response(status_code=status.HTTP_204_NO_CONTENT)
