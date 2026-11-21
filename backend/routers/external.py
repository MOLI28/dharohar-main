from fastapi import APIRouter
from services.external_service import wikidata_search, wikipedia_summary
router=APIRouter(prefix="/api/external",tags=["external"])

@router.get("/wikidata")
async def wikidata(q:str): return await wikidata_search(q)

@router.get("/wikipedia")
async def wikipedia(title:str):
    return await wikipedia_summary(title)
