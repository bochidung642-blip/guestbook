from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/entries", tags=["entries"])


@router.get("/", response_model=list[schemas.EntryRead])
def get_entries(db: Session = Depends(get_db)):
    return db.query(models.Entry).order_by(models.Entry.created_at.desc()).all()


@router.post("/", response_model=schemas.EntryRead, status_code=201)
def create_entry(entry: schemas.EntryCreate, db: Session = Depends(get_db)):
    db_entry = models.Entry(**entry.model_dump())
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry


@router.delete("/{entry_id}")
def delete_entry(entry_id: int, db: Session = Depends(get_db)):
    entry = db.query(models.Entry).filter(models.Entry.id == entry_id).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    db.delete(entry)
    db.commit()
    return {"success": True}
