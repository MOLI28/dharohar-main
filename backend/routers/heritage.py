from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from database import get_db
from models import Heritage, Timeline, InternalLocation
from schemas import HeritageOut

router = APIRouter(prefix="/api/heritage", tags=["heritage"])

@router.get("", response_model=list[HeritageOut])
def list_heritage(category: str | None = None, state: str | None = None, db: Session = Depends(get_db)):
    q = db.query(Heritage)
    if category: q = q.filter(Heritage.category == category)
    if state: q = q.filter(Heritage.state == state)
    return q.order_by(Heritage.name).all()

@router.get("/{heritage_id}", response_model=HeritageOut)
def get_heritage(heritage_id: str, db: Session = Depends(get_db)):
    conditions = [Heritage.slug == heritage_id]
    if heritage_id.isdigit(): conditions.append(Heritage.id == int(heritage_id))
    h = db.query(Heritage).filter(or_(*conditions)).first()
    if not h: raise HTTPException(404, "Heritage record not found")
    return h

@router.get("/{heritage_id}/timeline")
def get_timeline(heritage_id: str, db: Session = Depends(get_db)):
    h = db.query(Heritage).filter_by(slug=heritage_id).first()
    if not h: raise HTTPException(404, "Heritage record not found")
    return db.query(Timeline).filter_by(heritage_id=h.id).all()

@router.get("/{heritage_id}/locations")
def get_locations(heritage_id: str, db: Session = Depends(get_db)):
    h = db.query(Heritage).filter_by(slug=heritage_id).first()
    if not h: raise HTTPException(404, "Heritage record not found")
    return db.query(InternalLocation).filter_by(heritage_id=h.id).all()
