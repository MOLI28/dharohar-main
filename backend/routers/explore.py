from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Heritage
from math import radians, sin, cos, sqrt, atan2

router=APIRouter(prefix="/api/explore", tags=["explore"])

def distance_km(lat1,lon1,lat2,lon2):
    R=6371
    dlat=radians(lat2-lat1); dlon=radians(lon2-lon1)
    a=sin(dlat/2)**2+cos(radians(lat1))*cos(radians(lat2))*sin(dlon/2)**2
    return 2*R*atan2(sqrt(a),sqrt(1-a))

@router.get("/nearby")
def nearby(lat: float, lon: float, radius_km: float=100, db: Session=Depends(get_db)):
    rows=[]
    for h in db.query(Heritage).filter(Heritage.latitude.is_not(None), Heritage.longitude.is_not(None)).all():
        d=distance_km(lat,lon,h.latitude,h.longitude)
        if d<=radius_km:
            rows.append({"id":h.slug,"name":h.name,"category":h.category,"state":h.state,"city":h.city,"distance_km":round(d,1),"description":h.short_description,"image":(h.images or [None])[0]})
    return sorted(rows,key=lambda x:x["distance_km"])[:20]
