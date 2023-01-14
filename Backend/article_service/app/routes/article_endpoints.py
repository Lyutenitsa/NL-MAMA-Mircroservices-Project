from typing import List

from fastapi import Depends, APIRouter, Response, HTTPException, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app import schemas
from app.services import article_service

router = APIRouter(
	prefix="/articles",
	tags=["Articles"],
	responses={404: {"description": "Not Found"}},
)


def id_not_found_exception(id):
	return HTTPException(
		status_code=status.HTTP_404_NOT_FOUND,
		detail=f"Article with id= {id} not found"
	)


def check_article_exists(db, id, title):
	if id:
		if not article_service.get(db, id):
			raise id_not_found_exception
	elif title:
		if not article_service.check_title_exists(db=db, title=title):
			return HTTPException(
				status_code=status.HTTP_404_NOT_FOUND,
				detail=f"Article with title= {title} not found"
			)
		
		
@router.get("/", response_model=List[schemas.ArticleOut], status_code=status.HTTP_200_OK)
def get_all_articles(db: Session = Depends(get_db), ):
	db_article_all = article_service.get_multiple(db)
	return db_article_all


@router.get("/{id}", response_model=schemas.ArticleOut, status_code=status.HTTP_200_OK)
def get_article_by_id(id: str, db: Session = Depends(get_db), ):
	print(id)

	check_article_exists(db=db, id=id, title=None)
	
	db_article = article_service.get(db, id)
	return db_article


@router.get("/title/{title}", response_model=schemas.ArticleOut, status_code=status.HTTP_200_OK)
def get_article_by_title(title: str, db: Session = Depends(get_db), ):
	check_article_exists(db=db, id=None, title=title)
	
	db_article = article_service.get_by_title(db=db, title=title)
	return db_article


@router.post("/", response_model=schemas.ArticleOut, status_code=status.HTTP_201_CREATED)
def create_article(new_article: schemas.ArticleIn, db: Session = Depends(get_db), ):
	check_article_exists(db=db,id=None, title=new_article.title)
	
	db_article = article_service.create(db=db, obj_in=new_article)
	
	return db_article


@router.post("/load_testing", status_code=status.HTTP_201_CREATED)
def create_article(new_article: schemas.ArticleIn,):
	# check_article_exists(db=db,id=None, title=new_article.title)
	# db_article = article_service.create(db=db, obj_in=new_article)
	# return db_article

	print("Load testing endpoint")


@router.put("/{id}", response_model=schemas.ArticleOut, status_code=status.HTTP_200_OK)
def update_article(article_to_update: schemas.ArticleIn, id: str, db: Session = Depends(get_db)):
	check_article_exists(db, id=id, title=None)
	
	db_article = article_service.update(db, article_to_update, id)
	return db_article


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_article(id: str, db: Session = Depends(get_db), ):
	check_article_exists(db, id=id, title=None)
	
	article_service.delete(db=db, id=id)
	return Response(status_code=status.HTTP_204_NO_CONTENT)
