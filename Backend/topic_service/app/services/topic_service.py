from app.services.default_service import DefaultService
from app import models, schemas
from sqlalchemy.orm import Session


class TopicService(
	DefaultService[models.Topic, schemas.TopicBase, schemas.TopicBase],
):
	@staticmethod
	def method_for_sanity_check():
		return "returning article from child service"
	
	def check_name_exists(self, db: Session, name) -> bool:
		if self.get_by_name(db=db, name=name):
			return True
		else:
			return False
		
	def check_id_exists(self, db: Session, id) -> bool:
		if self.get(db, id):
			return True
		else:
			return False
	
	def get_by_name(self, db: Session, name,):
		return db.query(models.Topic).filter(models.Topic.name == name).first()


topic_service = TopicService(models.Topic)
