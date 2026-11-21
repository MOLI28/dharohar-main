# Dharohar (धरोहर): Source-Grounded Indian Heritage Platform 🏛️📜

🌐 **[Explore the Live Prototype](https://nidhitiwari5.github.io/dharohar/)** | 🏆 **Top 5 — Internal Smart India Hackathon (SIH) 2026 (Problem Statement S7)**

![Python](https://img.shields.io/badge/Python-3.11%E2%80%933.13-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat&logo=react&logoColor=black)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-ORM-D71F00?style=flat)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Ready-4169E1?style=flat&logo=postgresql&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Local%20Dev-003B57?style=flat&logo=sqlite&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Pages-2088FF?style=flat&logo=githubactions&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## 📑 Table of Contents
- [📖 Detailed Project Overview](#-detailed-project-overview)
- [⚙️ System Engineering & Performance Philosophy](#️-system-engineering--performance-philosophy)
- [🖥 System Interface & Interactive Modules](#-system-interface--interactive-modules)
- [🧠 Core Architecture & Retrieval Pipeline](#-core-architecture--retrieval-pipeline)
- [💎 Key Features & Impact](#-key-features--impact)
- [💻 Technology Stack](#-technology-stack)
- [📂 Directory Structure](#-directory-structure)
- [🚀 Local Installation](#-local-installation)
- [📡 API & Data Schemas](#-api--data-schemas)
- [🔮 Future Roadmap](#-future-roadmap)

---

## 📖 Detailed Project Overview
**Dharohar** is a full-stack, source-grounded digital heritage intelligence platform engineered to preserve and surface India's monuments, temples, crafts, stories, traditions, music, and dance. Rather than presenting static encyclopedia entries or unconstrained generative summaries, Dharohar enforces strict epistemic classification and database-grounded retrieval so users can distinguish documented historical evidence from oral folklore and architectural interpretation.

### 🧠 Deep-Dive Problem Statement
Conventional heritage portals and generic AI travel assistants suffer from five systemic architectural and informational gaps:

- **Scattered & Unstructured Knowledge:** Cultural records across monuments, crafts, folk traditions, and performing arts are fragmented across disconnected portals with inconsistent metadata schemas.
- **The Verification Gap (Fact vs. Folklore):** Popular folklore, colonial interpretations, and peer-reviewed archaeological findings are routinely blended together without provenance—a problem amplified when unconstrained LLMs hallucinate historical claims.
- **Hidden Heritage Blind Spots:** Search engines and tourism directories disproportionately rank major landmarks while leaving regional crafts, lesser-known temples, and oral histories undiscoverable.
- **Linguistic & Accessibility Barriers:** High-quality heritage documentation is heavily skewed toward English text, excluding regional-language learners and audio-first users.
- **Static Consumption Model:** Users read passive walls of text instead of interacting with temporal turning points, internal site layouts, or geospatial discovery.

### 💡 The Solution: Source-Grounded Multi-Tier Retrieval Architecture
Dharohar replaces passive content pages with a decoupled **React/Vite + FastAPI + SQLAlchemy** architecture backed by a four-tier knowledge and verification pipeline:

#### 1. Curated Relational Heritage Store (`models.py`, `database.py`, `seed_data.py`)
- **Core Technology:** SQLAlchemy ORM over SQLite for zero-friction local execution, engineered with a PostgreSQL-ready schema (`psycopg`).
- **Execution:** Separates cultural entities from frontend rendering code. Ships with 14 representative seed records spanning monuments, temples, crafts, stories/traditions, and music/dance, while supporting horizontal content scaling to **5,200+ structured records** without hard-coding assets into React components.

#### 2. Priority Search & External Knowledge Fallback (`routers/search.py`, `routers/external.py`, `services/external_service.py`)
- **Core Technology:** Multi-tier FastAPI query orchestration with Wikidata, Wikipedia, and Wikimedia fallback.
- **Execution:** Every user query first resolves against the curated internal Dharohar database to guarantee verified metadata and source attribution. When a record is not yet indexed locally, the backend routes cleanly to external open-knowledge APIs so discovery never hits a dead end.

#### 3. VIRAASAT Source-Grounded Assistant (`routers/ai.py`, `AIGuide.jsx`, `aiService.js`)
- **Core Technology:** Deterministic entity-first resolution and lexical token-scored database retrieval with bilingual (`en` / `hi`) response synthesis.
- **Execution:** Eliminates historical hallucination by binding every response strictly to fields present in the verified database record (period, architectural style, construction era, associated rulers, cultural significance, and citations). If no reliable curated record matches the query, VIRAASAT explicitly declines to fabricate facts and returns `grounded: true` with an empty source list.

#### 4. Epistemic Claim Classification Engine (`FactLegend.jsx`, `SourceDrawer.jsx`, `data/claims.js`)
- **Core Technology:** Structured claim tagging paired with inspectable citation drawers.
- **Execution:** Classifies every historical statement by evidentiary weight rather than popularity across four explicit states—**Verified**, **Folklore**, **Interpretation**, and **Unverified** (e.g., separating documented architectural structures at Bhangarh Fort from the folklore surrounding Baba Balu Nath's curse).

---

## ⚙️ System Engineering & Performance Philosophy
The codebase is structured for modularity, graceful degradation, and low-overhead deployment:

- **Decoupled Router Architecture (`main.py` & `routers/`):** Domain boundaries are strictly isolated across seven FastAPI routers (`heritage`, `search`, `explore`, `categories`, `ai`, `external`, and `language`), paired with environment-driven CORS policies and deterministic startup seeding.
- **Zero-Downtime Client Resilience (`src/data/` & `src/services/api.js`):** Implements an automated frontend fallback layer across search, timelines, internal site exploration, and heritage detail views. If the FastAPI microservice is offline (such as on static GitHub Pages hosting), the UI degrades gracefully to the curated demo archive without breaking user flows.
- **Lightweight Media Strategy:** References public Wikimedia Commons and external image URLs with preserved attribution metadata rather than bundling heavy binary assets into Git, keeping repository builds and CI/CD pipelines fast.

---

## 🖥 System Interface & Interactive Modules
Dharohar transforms cultural reading into an interactive spatial, temporal, and auditory exploration workflow.

> *(Add your interface preview image here, e.g., `![Dharohar Platform Preview](./docs/dashboard.png)`)*

### 📊 Core UI Modules
- **Discovery Hero & Smart Search (`Hero.jsx`, `SearchResults.jsx`):** Unified entry point combining natural search, category filters (*Monuments & Places*, *Temples*, *Crafts*, *Stories & Traditions*, *Music & Dance*), *Explore Near Me*, and *Ask Viraasat*.
- **Epistemic Verification Legend & Source Drawer (`FactLegend.jsx`, `SourceDrawer.jsx`):** Color-coded evidence badges (**Verified**, **Folklore**, **Interpretation**, **Unverified**) with slide-out citations allowing users to inspect primary references behind every claim.
- **Journey Through Time (`Timeline.jsx`):** Interactive chronological milestone explorer mapping major historical turning points (*Foundation*, *Expansion*, *Continuity*) for featured heritage records.
- **Walk Through the Ruins (`ArchitectureExplorer.jsx`, `Bhangarh.jsx`):** Internal site explorer enabling users to inspect sub-structures, architectural zones, and spatial context within a monument complex.
- **VIRAASAT AI Guide (`AIGuide.jsx`):** Conversational interface anchored to active heritage context, returning structured answers, source arrays, and grounding indicators.

### ⚙️ Interactive Controls & Accessibility
- **Geospatial Discovery (`Explore.jsx`, `routers/explore.py`):** Requests browser geolocation coordinates to surface nearby heritage sites, with an automatic fallback to manual city/location entry when permission is denied.
- **Multilingual UI Context (`LanguageContext.jsx`, `LanguageSelector.jsx`):** React Context-driven localization layer supporting language switching across interface controls and VIRAASAT responses.
- **Audio Narration (`AudioGuide.jsx`):** Browser-native Text-to-Speech (TTS) playback enabling hands-free listening (e.g., *Listen to Sanchi Stupa*) without requiring external paid audio APIs.

---

## 🧠 Core Architecture & Retrieval Pipeline
The platform executes a deterministic, fallback-aware data flow from user interaction to verified presentation:

### 🌊 Data Pipeline & Flow Diagram
```text
┌────────────────────────────────────────────────────────────────────────────┐
│                     React + Vite Frontend (Client Layer)                   │
│  [Hero Search]  [Explore Near Me]  [Language Context]  [VIRAASAT AI Guide] │
└───────┬──────────────────┬──────────────────┬────────────────────┬─────────┘
        │ REST API         │ Geolocation /    │ Locale State       │ POST /api/ai/chat
        ▼                  │ Manual City      ▼                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                    FastAPI Microservice Gateway (main.py)                  │
│   routers/search.py   routers/explore.py   routers/language.py   ai.py     │
└───────┬──────────────────┬──────────────────┬────────────────────┬─────────┘
        │                  │                  │                    │
        ▼                  ▼                  │                    ▼
┌───────────────────────────────┐             │     ┌────────────────────────┐
│   Dharohar Curated Database   │◄────────────┴────►│  VIRAASAT Grounded     │
│  (SQLAlchemy: SQLite / PGSQL) │                   │  Retrieval & Synthesis │
└───────┬───────────────────────┘                   │  (Entity + Token Score)│
        │                                           └──────────┬─────────────┘
   Record Found?                                               │
   ├── Yes ──► Heritage Detail + Timeline + Source Drawer      ▼
   └── No  ──► external_service.py (Wikidata / Wikimedia)   Grounded JSON
               + Client Demo Fallback (Offline Mode)        + Citations (en/hi)
```
## 💎 Key Features & Impact

### ✨ Core Features
- **Zero-Hallucination Grounding:** VIRAASAT binds answers exclusively to curated database fields and returns explicit source lists rather than unverified generations.
- **Epistemic Transparency:** Separates archaeological facts from folklore and interpretation at the UI level, directly addressing misinformation in cultural history.
- **Dual-Mode Hosting Resilience:** Runs seamlessly both as a full-stack FastAPI + SQL platform and as a self-contained static prototype on GitHub Pages via automated demo-data fallbacks.
- **Zero-Cost Open Architecture:** Built entirely on open-source tooling (FastAPI, SQLAlchemy, React, Wikimedia/Wikidata APIs, Browser TTS & Geolocation).

### 📈 Cultural & Research Impact
- **Preservation of Hidden Heritage:** Provides a uniform relational schema capable of elevating regional crafts, oral folklore, and lesser-known temples alongside UNESCO sites.
- **Trustworthy Educational Discovery:** Equips students, tourists, educators, and researchers with verifiable citations rather than unattributed summaries.
- **Inclusive Multilingual Access:** Bridges linguistic barriers through extensible localization architecture and browser-native voice narration.

---

## 💻 Technology Stack

### 🧠 Knowledge, Search & Grounding Layer
- **VIRAASAT Grounded Retrieval Engine (`routers/ai.py`):** Entity-slug/ID lookup and lexical token-scoring retrieval over SQLAlchemy models with bilingual (`en`/`hi`) synthesis and hallucination guardrails.
- **External Knowledge Fallback (`external_service.py`):** Wikidata, Wikipedia, and Wikimedia integration for unindexed cultural queries.

### ⚙️ Backend & Persistence
- **Python (3.11–3.13):** Core backend runtime (`psycopg-binary` wheels supported up to Python 3.13).
- **FastAPI & Uvicorn:** High-performance ASGI web framework with automatic OpenAPI (`/docs`) generation and CORS middleware.
- **SQLAlchemy ORM:** Database abstraction running on **SQLite** locally and configured for drop-in **PostgreSQL** deployment.
- **Pydantic (`schemas.py`):** Strict request/response validation for API payloads.

### 🖥 Frontend & Accessibility
- **React & Vite:** Component-driven single-page architecture with fast HMR builds.
- **React Context API:** Global UI and multilingual state orchestration (`UIContext`, `LanguageContext`).
- **Browser Web APIs:** Native Geolocation API (*Explore Near Me*) and Web Speech API (*AudioGuide* TTS).

### 🚀 DevOps & Deployment
- **GitHub Actions (`.github/workflows/deploy.yml`):** Automated CI/CD build and deployment pipeline publishing the React frontend to GitHub Pages.
## 📂 Directory Structure
The repository enforces a clean separation between the FastAPI backend services, relational database definitions, and the modular React frontend:

```text
dharohar-main/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI/CD for GitHub Pages
├── backend/                        # FastAPI Backend & Database Layer
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── ai.py                   # VIRAASAT grounded Q&A endpoint (/api/ai/chat)
│   │   ├── categories.py           # Cultural category filtering endpoints
│   │   ├── explore.py              # Geospatial / Explore Near Me routes
│   │   ├── external.py             # Wikidata / Wikimedia fallback routes
│   │   ├── heritage.py             # Heritage entity CRUD & detail routes
│   │   ├── language.py             # Language preference & localization routes
│   │   └── search.py               # Curated-priority heritage search routes
│   ├── services/
│   │   ├── __init__.py
│   │   └── external_service.py     # External knowledge base integration logic
│   ├── .env.example                # Backend environment template
│   ├── database.py                 # SQLAlchemy engine, SessionLocal & Base config
│   ├── main.py                     # FastAPI entry point, CORS & auto-seeding
│   ├── models.py                   # Relational ORM schema (Heritage, etc.)
│   ├── requirements.txt            # Python backend dependencies
│   ├── schemas.py                  # Pydantic request/response contracts
│   └── seed_data.py                # 14 representative multi-category seed records
├── public/
│   └── images/                     # Public media assets & attribution notes
├── src/                            # React + Vite Frontend Application
│   ├── components/                 # Reusable Interactive UI Modules
│   │   ├── AIGuide.jsx             # VIRAASAT chat drawer & grounding display
│   │   ├── ArchitectureExplorer.jsx# Walk Through the Ruins site explorer
│   │   ├── AudioGuide.jsx          # Browser TTS narration control
│   │   ├── FactLegend.jsx          # Verified / Folklore / Interpretation legend
│   │   ├── Footer.jsx
│   │   ├── HeritageCard.jsx        # Image-led discovery cards
│   │   ├── Hero.jsx                # Primary search & CTA landing block
│   │   ├── LanguageSelector.jsx    # Multilingual switcher UI
│   │   ├── Navbar.jsx
│   │   ├── QuickFacts.jsx          # Structured metadata summary panel
│   │   ├── SourceDrawer.jsx        # Citation & provenance inspection drawer
│   │   └── Timeline.jsx            # Journey Through Time milestone viewer
│   ├── context/
│   │   ├── LanguageContext.jsx     # Global multilingual translations & state
│   │   └── UIContext.jsx           # Drawer, modal & interactive UI state
│   ├── data/                       # Curated offline demo fallback datasets
│   │   ├── bhangarh.js
│   │   ├── claims.js               # Epistemic fact vs. folklore definitions
│   │   ├── demoHeritage.js
│   │   ├── sources.js
│   │   ├── stories.js
│   │   └── structures.js
│   ├── hooks/
│   │   └── useReveal.js            # Scroll-reveal interaction hook
│   ├── pages/
│   │   ├── Bhangarh.jsx            # Featured deep-dive heritage showcase
│   │   ├── Explore.jsx             # Location-based discovery view
│   │   ├── HeritageDetail.jsx      # Dynamic source-backed entity page
│   │   ├── Home.jsx                # Main discovery hub
│   │   └── SearchResults.jsx       # Unified DB + fallback search view
│   ├── services/
│   │   ├── aiService.js            # Frontend VIRAASAT API & fallback bridge
│   │   └── api.js                  # Centralized HTTP client
│   ├── App.jsx                     # Root route & provider composition
│   ├── index.css                   # Global styling
│   └── main.jsx                    # React DOM entry point
├── .env.example                    # Frontend environment template
├── .gitignore
├── index.html
├── package.json                    # Frontend dependencies & Vite scripts
├── package-lock.json
├── README.md                       # Project documentation
└── vite.config.js                  # Vite build configuration
```
## 🚀 Local Installation
Dharohar runs as a decoupled FastAPI backend and React/Vite frontend. Open two concurrent terminal sessions to run the full stack locally.

### Prerequisites
- **Python 3.11–3.13** *(Note: Python 3.14 is not yet supported by pre-built `psycopg-binary` wheels)*
- **Node.js (v18+) & npm**

### Step 1: Clone the Repository
```powershell
git clone [https://github.com/MOLI28/dharohar.git](https://github.com/MOLI28/dharohar.git)
cd dharohar
```

### Step 2: Backend Environment Setup (FastAPI + SQLAlchemy)
Isolate backend dependencies inside a Python 3.12 virtual environment:

```powershell
cd backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

### Step 3: Frontend Setup (React + Vite)
Open a second terminal in the repository root folder:

```powershell
npm install
```

### Step 4: Environment Configuration *(Optional)*
Copy `.env.example` to `.env` in both the project root and `backend/` directories if you wish to customize `CORS_ORIGINS` (defaults to `http://localhost:5173`) or connect an external PostgreSQL database URL.

### Step 5: Run Both Services Concurrently

**Terminal 1 — FastAPI Backend (`backend/`):**
```powershell
.\.venv\Scripts\Activate.ps1
python -m uvicorn main:app --reload --port 8000
```
- **Health Check:** `http://localhost:8000/`
- **Interactive Swagger Docs:** `http://localhost:8000/docs`

**Terminal 2 — React Frontend (repository root):**
```powershell
npm run dev
```
- **Web Application:** `http://localhost:5173`

> **GitHub Pages Deployment:** Push to `main` and set **Settings → Pages → Source** to **GitHub Actions**. GitHub Pages hosts the static React frontend with automatic client-side fallback data; host the FastAPI service and PostgreSQL database independently for live API persistence.

---

## 📡 API & Data Schemas
The backend exposes modular REST endpoints documented automatically via OpenAPI (`/docs`), with automatic database seeding on startup.

### 🌐 Core REST Endpoints
- `GET /` — Service health check returning API status, database connectivity, and OpenAPI docs pointer (`{"status": "ok", "service": "dharohar-api", "database": "connected", "docs": "/docs"}`).
- `POST /api/ai/chat` — Submits a user question (optionally scoped to a `heritage_id` and `language`) to the VIRAASAT grounded retrieval engine.
- `GET /api/heritage/*` — Retrieves curated heritage listings and individual monument/tradition detail records.
- `GET /api/search/*` — Queries internal database records with priority ranking before triggering external knowledge fallback.
- `GET /api/explore/*` — Returns heritage sites filtered by proximity or user-supplied location.
- `GET /api/categories/*` — Lists records grouped across cultural domains (*Monuments*, *Temples*, *Crafts*, *Stories & Traditions*, *Music & Dance*).
- `GET /api/external/*` — Fetches structured fallback records from external open knowledge sources (Wikidata / Wikipedia / Wikimedia).
- `GET /api/language/*` — Serves language configuration and localized metadata.

### 🧩 VIRAASAT Grounded Chat Schema (`POST /api/ai/chat`)

**Request Payload (`ChatRequest`):**
```json
{
  "question": "Tell me about the architecture and history of Bhangarh Fort",
  "heritage_id": "bhangarh-fort",
  "language": "en"
}
```

**Response Payload:**
```json
{
  "answer": "Bhangarh Fort: A 17th-century fortified settlement in Alwar, Rajasthan. Period: 17th Century CE. Architectural style: Rajput fortification with temples, markets, havelis, and a royal palace. Associated with: Raja Bhagwan Das, Madho Singh. This answer is grounded in the Dharohar curated record; unsupported historical claims are not presented as facts.",
  "sources": [
    {
      "title": "Archaeological Survey of India — Bhangarh Monument Records",
      "type": "Verified"
    }
  ],
  "grounded": true,
  "heritage_id": 1
}
```

---

## 🔮 Future Roadmap
The current architecture establishes a verifiable, citation-first foundation for large-scale cultural preservation. Planned engineering phases include:

- **Hybrid Vector RAG + LLM Synthesis (Llama 3.1 / Groq):** Layer semantic dense-vector retrieval (`pgvector` on PostgreSQL) and constrained LLM generation over the existing curated schema to handle complex comparative historical queries while preserving strict citation grounding.
- **Full-Scale Dataset Expansion (5,200+ Records):** Ingest verified ASI, regional museum, and intangible cultural heritage archives into a production PostgreSQL + PostGIS cluster for sub-second spatial indexing.
- **Interactive Geospatial Mapping (`Leaflet.js` + OpenStreetMap):** Upgrade *Explore Near Me* with clustered interactive map tiles, cultural trail routing, and verified monument-specific Wikimedia media replacing any placeholder imagery.
- **Expanded Indian Language & Indic TTS Coverage:** Extend bilingual (`en`/`hi`) grounding to additional scheduled Indian languages with neural regional voice synthesis.

---

*Architected and Developed by Moli Maheshwari | B.Tech Computer Science Candidate (2028)*
