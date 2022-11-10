from datetime import datetime

from pydantic import BaseModel
from uuid import UUID


class TopicBase(BaseModel):
	name: str
	description: str
	category: str
	
	author_user_id: UUID
	
	class Config:
		orm_mode = True


class TopicOut(TopicBase):
	id: UUID
	created_at: datetime


class TopicIn(TopicBase):
	pass
