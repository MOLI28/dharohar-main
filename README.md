# Dharohar — Interactive Heritage Platform

A full-stack prototype for discovering Indian monuments, temples, crafts, stories, traditions, music and dance through a source-aware interface.

## Demo features
- Image-led heritage cards and immersive hero sections
- Search with curated database priority and external fallback
- Dynamic heritage detail pages
- Quick facts, historical context and source attribution
- Journey Through Time timeline for every featured demo record
- Walk Through the Ruins interactive internal site explorer for every featured demo record
- Browser Text-to-Speech audio fallback
- VIRAASAT source-aware AI prototype with database grounding and offline fallback
- Explore Near Me using browser geolocation
- Multilingual UI architecture
- SQLite for local demo; PostgreSQL-ready database layer

## Demo dataset
The seed contains 14 representative records across monuments, temples, crafts, stories/traditions and music/dance. The schema is designed to scale to 5,200+ records without hard-coding content into React components.

## Run locally
### Frontend
```powershell
npm install
npm run dev
```

### Backend (Python 3.11 recommended)
```powershell
cd backend
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

Open `http://localhost:5173` and API docs at `http://localhost:8000/docs`.

The frontend contains curated demo fallbacks, so the visual prototype remains usable even if FastAPI is temporarily offline. Search, timeline, internal locations and heritage pages use the API when available and fall back to the demo archive when it is not.

## Images
Monument and cultural images are referenced from public Wikimedia Commons or Unsplash URLs so the deployed prototype can load visual material without bundling large image binaries. Wikimedia image sources are credited in the relevant heritage records.

Before a production release, replace any Unsplash placeholder used for a less-specific heritage record with a verified monument-specific image and retain attribution/licensing information.

## GitHub Pages
A GitHub Actions workflow is included at `.github/workflows/deploy.yml`. Push the repository's `main` branch, then enable GitHub Pages using **GitHub Actions** as the source in repository Settings → Pages.

GitHub Pages hosts the React frontend only. FastAPI/PostgreSQL must be hosted separately for live database/API functionality. The frontend has a demo-data fallback so the public prototype does not become blank when the backend is unavailable.
