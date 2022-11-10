from app.services.default_service import DefaultService
from app import models, schemas
from sqlalchemy.orm import Session


class ArticleService(
	DefaultService[models.Article, schemas.ArticleBase, schemas.ArticleBase],
):
	@staticmethod
	def method_for_sanity_check():
		return "returning article from child service"
	
	def check_title_exists(self, db: Session, title) -> bool:
		if self.get_by_title(db=db, title=title):
			return True
		else:
			return False
		
	def check_id_exists(self, db: Session, id) -> bool:
		if self.get(db, id):
			return True
		else:
			return False
	
	def get_by_title(self, db: Session, title,):
		return db.query(models.Article).filter(models.Article.title == title).first()


article_service = ArticleService(models.Article)
