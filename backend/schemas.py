from typing import Any, Optional
from pydantic import BaseModel, ConfigDict

class HeritageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    slug: str
    category: str
    subcategory: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None
    region: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    short_description: Optional[str] = None
    long_description: Optional[str] = None
    historical_significance: Optional[str] = None
    cultural_significance: Optional[str] = None
    architectural_style: Optional[str] = None
    period: Optional[str] = None
    built_year: Optional[str] = None
    associated_rulers: Any = None
    interesting_facts: Any = None
    images: Any = None
    sources: Any = None
    verification_status: str
    wikidata_id: Optional[str] = None
    wikipedia_url: Optional[str] = None

class ChatRequest(BaseModel):
    question: str
    heritage_id: Optional[str] = None
    language: str = 'en'
