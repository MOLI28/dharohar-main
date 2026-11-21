from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Heritage
router=APIRouter(prefix="/api/categories",tags=["categories"])

@router.get("")
def categories(db: Session=Depends(get_db)):
    return [{"name":name,"count":db.query(Heritage).filter_by(category=name).count()} for name in ["Monuments & Places","Temples","Crafts","Stories & Traditions","Music & Dance"]]
