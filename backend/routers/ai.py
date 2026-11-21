from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Heritage
from schemas import ChatRequest

router = APIRouter(prefix="/api/ai", tags=["ai"])

@router.post("/chat")
def chat(req: ChatRequest, db: Session = Depends(get_db)):
    records = []
    if req.heritage_id:
        h = db.query(Heritage).filter(Heritage.slug == req.heritage_id).first()
        if not h and str(req.heritage_id).isdigit():
            h = db.query(Heritage).filter(Heritage.id == int(req.heritage_id)).first()
        if h:
            records = [h]
    if not records:
        q = req.question.strip().lower()
        all_records = db.query(Heritage).all()
        terms = [x for x in q.replace('?', ' ').replace(',', ' ').split() if len(x) > 2]
        scored = []
        for h in all_records:
            hay = ' '.join(filter(None, [h.name, h.slug.replace('-', ' '), h.category, h.state or '', h.city or ''])).lower()
            score = sum(1 for term in terms if term in hay)
            if score:
                scored.append((score, h))
        scored.sort(key=lambda x: x[0], reverse=True)
        records = [x[1] for x in scored[:2]]

    if not records:
        return {"answer": "I could not find a reliable Dharohar record for that question yet. Try asking about a monument, temple, craft, tradition, festival, music or dance form in the curated archive.", "sources": [], "grounded": True}

    h = records[0]
    facts = []
    if h.short_description: facts.append(h.short_description)
    if h.period: facts.append(f"Period: {h.period}.")
    if h.architectural_style: facts.append(f"Architectural style: {h.architectural_style}.")
    if h.built_year: facts.append(f"Date/period: {h.built_year}.")
    if h.associated_rulers: facts.append(f"Associated with: {', '.join(h.associated_rulers)}.")
    if h.cultural_significance: facts.append(f"Cultural significance: {h.cultural_significance}")
    if h.interesting_facts: facts.append(f"Interesting fact: {h.interesting_facts[0]}")
    answer = f"{h.name}: " + ' '.join(facts) + " This answer is grounded in the Dharohar curated record; unsupported historical claims are not presented as facts."
    if req.language == 'hi':
        answer = f"{h.name}: " + (h.short_description or "इस रिकॉर्ड के लिए संक्षिप्त विवरण उपलब्ध है।") + " यह उत्तर धरोहर के क्यूरेटेड रिकॉर्ड पर आधारित है; अपुष्ट ऐतिहासिक दावों को तथ्य के रूप में प्रस्तुत नहीं किया जाता।"
    return {"answer": answer, "sources": h.sources or [], "grounded": True, "heritage_id": h.id}
