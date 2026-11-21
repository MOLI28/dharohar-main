from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, SessionLocal
import models
from seed_data import seed
from routers import heritage, search, explore, categories, ai, external, language
import os

Base.metadata.create_all(bind=engine)
db=SessionLocal()
try: seed(db)
finally: db.close()

app=FastAPI(title="Dharohar API",version="1.0.0",description="Source-backed Indian heritage API")
origins=os.getenv("CORS_ORIGINS","http://localhost:5173").split(",")
app.add_middleware(CORSMiddleware,allow_origins=origins,allow_credentials=True,allow_methods=["*"],allow_headers=["*"])
app.include_router(heritage.router)
app.include_router(search.router)
app.include_router(explore.router)
app.include_router(categories.router)
app.include_router(ai.router)
app.include_router(external.router)
app.include_router(language.router)

@app.get("/")
def root():
    return {"status":"ok","service":"dharohar-api","database":"connected","docs":"/docs"}
