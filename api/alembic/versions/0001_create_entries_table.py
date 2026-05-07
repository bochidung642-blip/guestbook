"""create entries table

Revision ID: 0001
Revises:
Create Date: 2026-05-07

"""
from alembic import op
import sqlalchemy as sa

revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "entries",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("message", sa.String(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=True,
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_entries_id"), "entries", ["id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_entries_id"), table_name="entries")
    op.drop_table("entries")
