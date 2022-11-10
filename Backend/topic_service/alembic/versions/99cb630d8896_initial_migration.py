"""initial migration

Revision ID: 99cb630d8896
Revises: 
Create Date: 2022-11-10 09:50:47.298867

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID
import uuid

# revision identifiers, used by Alembic.
revision = '99cb630d8896'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'topics',
        sa.Column(
            'id',
            UUID,
            default=uuid.uuid4,
            primary_key=True,
            unique=True,
            server_default=sa.text('gen_random_uuid()')
        ),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('description', sa.String(), nullable=False),
        sa.Column('category', sa.String(), nullable=False),
        
        sa.Column('author_user_id', UUID, unique=True, nullable=False),
        
        sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade() -> None:
    op.drop_table('topics')

