from app.database.database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, TIMESTAMP, text
from sqlalchemy.dialects.postgresql import UUID
import uuid


class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), index=True, nullable=False, primary_key=True, default=uuid.uuid4)
    username = Column(String, nullable=False)
    password = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
