from fastapi import APIRouter, Depends
from sqlalchemy import or_
from sqlalchemy.orm import Session
from database import get_db
from models import Heritage
from services.external_service import wikidata_search, wikipedia_summary

router = APIRouter(prefix="/api/search", tags=["search"])

@router.get("")
async def search(q: str, category: str | None = None, state: str | None = None, db: Session = Depends(get_db)):
    term = f"%{q.strip().lower()}%"
    query = db.query(Heritage).filter(or_(Heritage.name.ilike(term), Heritage.short_description.ilike(term), Heritage.category.ilike(term), Heritage.city.ilike(term), Heritage.state.ilike(term)))
    if category: query = query.filter(Heritage.category == category)
    if state: query = query.filter(Heritage.state == state)
    local = query.limit(30).all()
    results = [{"id":h.slug,"name":h.name,"category":h.category,"state":h.state,"city":h.city,"description":h.short_description,"image":(h.images or [None])[0],"source":"Dharohar Curated Database","verification_status":h.verification_status} for h in local]
    if results:
        return {"query":q,"source":"Dharohar Curated Database","results":results}
    wiki = await wikidata_search(q)
    external=[]
    for item in wiki[:5]:
        title=item.get("label") or q
        summary=await wikipedia_summary(title)
        external.append({"id":item.get("id"),"name":title,"category":"External Source","state":None,"city":None,"description":(summary or {}).get("extract") or item.get("description"),"image":((summary or {}).get("thumbnail") or {}).get("source"),"source":"Wikidata / Wikipedia","verification_status":"external","wikipedia_url":(summary or {}).get("content_urls",{}).get("desktop",{}).get("page")})
    return {"query":q,"source":"Wikidata / Wikipedia","results":external}
