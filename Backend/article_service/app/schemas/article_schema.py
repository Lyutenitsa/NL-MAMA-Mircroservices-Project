from datetime import datetime

from pydantic import BaseModel
from uuid import UUID


class ArticleBase(BaseModel):
	title: str
	description: str
	content: str
	
	author_user_id: UUID
	topic_id: UUID
	
	class Config:
		orm_mode = True


class ArticleOut(ArticleBase):
	id: UUID
	created_at: datetime


class ArticleIn(ArticleBase):
	pass
