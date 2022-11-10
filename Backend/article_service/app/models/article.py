from app.database.database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, TIMESTAMP, text
from sqlalchemy.dialects.postgresql import UUID
import uuid


class Article(Base):
    __tablename__ = "articles"
    
    id = Column(
        UUID(as_uuid=True), index=True,
        nullable=False, primary_key=True, default=uuid.uuid4
    )
    
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    content = Column(String, nullable=False)
    
    author_user_id = Column(UUID(as_uuid=True), nullable=False)
    topic_id = Column(UUID(as_uuid=True), nullable=False)
    
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False,
        server_default=text('now()')
    )
    