from typing import List

from fastapi import Depends, APIRouter, Response, HTTPException, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app import schemas
from app.services import topic_service

router = APIRouter(
	prefix="/topics",
	tags=["Topics"],
	responses={404: {"description": "Not Found"}},
)


def id_not_found_exception(id):
	return HTTPException(
		status_code=status.HTTP_404_NOT_FOUND,
		detail=f"Topic with id= {id} not found"
	)


def check_topic_exists(db, id, name):
	if id:
		if not topic_service.get(db, id):
			raise id_not_found_exception
	elif name:
		if not topic_service.check_name_exists(db=db, name=name):
			return HTTPException(
				status_code=status.HTTP_404_NOT_FOUND,
				detail=f"Topic with name= {name} not found."
			)
		
		
@router.get("/", response_model=List[schemas.TopicOut], status_code=status.HTTP_200_OK)
def get_all_topics(db: Session = Depends(get_db), ):
	db_topic_all = topic_service.get_multiple(db)
	return db_topic_all


@router.get("/{id}", response_model=schemas.TopicOut, status_code=status.HTTP_200_OK)
def get_topic_by_id(id: str, db: Session = Depends(get_db), ):
	print(id)

	check_topic_exists(db=db, id=id, name=None)
	
	db_topic = topic_service.get(db, id)
	return db_topic


@router.get("/name/{name}", response_model=schemas.TopicOut, status_code=status.HTTP_200_OK)
def get_topic_by_name(name: str, db: Session = Depends(get_db), ):
	check_topic_exists(db=db, id=None, name=name)
	
	db_topic = topic_service.get_by_name(db=db, name=name)
	return db_topic


@router.post("/", response_model=schemas.TopicOut, status_code=status.HTTP_201_CREATED)
def create_topic(new_topic: schemas.TopicIn, db: Session = Depends(get_db), ):
	check_topic_exists(db=db, id=None, name=new_topic.name)
	
	db_topic = topic_service.create(db=db, obj_in=new_topic)
	
	return db_topic


@router.put("/{id}", response_model=schemas.TopicOut, status_code=status.HTTP_200_OK)
def update_topic(topic_to_update: schemas.TopicIn, id: str, db: Session = Depends(get_db)):
	check_topic_exists(db, id=id, name=None)
	
	db_topic = topic_service.update(db, topic_to_update, id)
	return db_topic


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_topic(id: str, db: Session = Depends(get_db), ):
	check_topic_exists(db, id=id, name=None)
	
	topic_service.delete(db=db, id=id)
	return Response(status_code=status.HTTP_204_NO_CONTENT)
