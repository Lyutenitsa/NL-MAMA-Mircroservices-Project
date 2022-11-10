from datetime import datetime

from pydantic import BaseModel
from uuid import UUID


class UserBase(BaseModel):
	username: str
	first_name: str
	last_name: str
	
	class Config:
		orm_mode = True


class UserOut(UserBase):
	id: UUID
	created_at: datetime


class UserIn(UserBase):
	password: str
