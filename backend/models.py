from sqlalchemy import Column, Integer, String, Float, Text, JSON, ForeignKey
from database import Base

class Heritage(Base):
    __tablename__ = "heritage"
    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False, index=True)
    slug = Column(String(220), unique=True, nullable=False, index=True)
    category = Column(String(80), nullable=False, index=True)
    subcategory = Column(String(120))
    state = Column(String(100), index=True)
    city = Column(String(100), index=True)
    region = Column(String(100))
    latitude = Column(Float)
    longitude = Column(Float)
    short_description = Column(Text)
    long_description = Column(Text)
    historical_significance = Column(Text)
    cultural_significance = Column(Text)
    architectural_style = Column(String(200))
    period = Column(String(120))
    built_year = Column(String(80))
    associated_rulers = Column(JSON)
    interesting_facts = Column(JSON)
    images = Column(JSON)
    sources = Column(JSON)
    verification_status = Column(String(40), default="verified")
    wikidata_id = Column(String(50))
    wikipedia_url = Column(String(500))

class Timeline(Base):
    __tablename__ = "timeline"
    id = Column(Integer, primary_key=True)
    heritage_id = Column(Integer, ForeignKey("heritage.id"), index=True)
    period = Column(String(120))
    year = Column(String(80))
    title = Column(String(200))
    description = Column(Text)
    image = Column(String(500))
    ruler = Column(String(200))
    architectural_changes = Column(Text)
    historical_context = Column(Text)
    stories = Column(Text)
    legends = Column(Text)

class InternalLocation(Base):
    __tablename__ = "internal_locations"
    id = Column(Integer, primary_key=True)
    heritage_id = Column(Integer, ForeignKey("heritage.id"), index=True)
    name = Column(String(200))
    x_position = Column(Float)
    y_position = Column(Float)
    description = Column(Text)
    significance = Column(Text)
    history = Column(Text)
    interesting_facts = Column(JSON)

class Translation(Base):
    __tablename__ = "translations"
    id = Column(Integer, primary_key=True)
    heritage_id = Column(Integer, ForeignKey("heritage.id"), index=True)
    language_code = Column(String(10), index=True)
    field = Column(String(80))
    value = Column(Text)
