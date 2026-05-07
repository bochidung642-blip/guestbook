from datetime import datetime
from pydantic import BaseModel


class EntryCreate(BaseModel):
    name: str
    message: str


class EntryRead(BaseModel):
    id: int
    name: str
    message: str
    created_at: datetime

    model_config = {"from_attributes": True}
