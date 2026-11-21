import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Archive, Sparkles, Map, Landmark, ShieldCheck, Search, Navigation } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useUI } from '../context/UIContext.jsx';

export default function Hero() {
  const { t } = useLanguage();
  const { openAIGuide } = useUI();
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');
  const submitSearch = (e) => { e.preventDefault(); if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`); };

  return (
    <section className="hero">
      <div className="hero__bg" />
      <div className="hero__scrim" />
      <div className="hero__floaters" aria-hidden="true">
        <span className="floater floater--1"><Archive size={20} /></span>
        <span className="floater floater--2"><Sparkles size={18} /></span>
        <span className="floater floater--3"><Map size={20} /></span>
        <span className="floater floater--4"><Landmark size={18} /></span>
        <span className="floater floater--5"><ShieldCheck size={18} /></span>
      </div>

      <div className="container hero__content">
        <span className="eyebrow hero__eyebrow">Digital Heritage Platform</span>
        <h1 className="hero__headline">{t.heroHeadline}</h1>
        <p className="hero__subtitle">{t.heroSubtitle}</p>
        <form className="hero-search" onSubmit={submitSearch}>
          <Search size={20}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.searchPlaceholder}/>
          <button type="submit" className="btn btn-gold">Search</button>
        </form>
        <div className="hero__actions">
          <Link to="/explore" className="btn btn-primary"><Navigation size={16}/> Explore Near Me</Link>
          <button className="btn btn-ghost" onClick={() => openAIGuide()}>{t.askVirasat}</button>
        </div>
        <div className="hero__meta">
          <div className="evidence-spectrum hero__spectrum" />
          <span>Every fact classified — Verified · Folklore · Interpretation · Unverified</span>
        </div>
      </div>

      <style>{`
        .hero { position: relative; min-height: 92vh; display: flex; align-items: center; overflow: hidden; padding-top: 40px; }
        .hero__bg {
          position: absolute; inset: 0;
          background-image: url('https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2000&auto=format&fit=crop');
          background-size: cover; background-position: center 65%;
          background-color: #241c15;
        }
        .hero__scrim {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(23,19,15,0.55) 0%, rgba(23,19,15,0.72) 55%, var(--charcoal) 100%),
                      linear-gradient(90deg, rgba(23,19,15,0.85) 0%, rgba(23,19,15,0.25) 55%, rgba(23,19,15,0.65) 100%);
        }
        .hero__content { position: relative; z-index: 2; max-width: 760px; padding-top: 60px; padding-bottom: 90px; }
        .hero__eyebrow { color: var(--gold); }
        .hero__eyebrow::before { background: var(--gold); }
        .hero__headline {
          font-size: clamp(42px, 6.2vw, 76px);
          line-height: 1.05;
          margin-top: 22px;
          text-shadow: 0 4px 30px rgba(0,0,0,0.5);
        }
        .hero__subtitle {
          margin-top: 22px; font-size: 18px; max-width: 540px;
          color: rgba(244,236,218,0.86); line-height: 1.7;
        }
        .hero__actions { display: flex; gap: 16px; margin-top: 24px; flex-wrap: wrap; }
        .hero-search { display:flex; align-items:center; gap:10px; margin-top:32px; max-width:720px; padding:9px 10px 9px 18px; background:rgba(255,243,176,.96); border-radius:999px; color:var(--slate); }
        .hero-search input { flex:1; min-width:0; border:0; outline:0; background:transparent; color:var(--slate); font-size:15px; }
        .hero-search .btn { padding:11px 20px; }
        .hero__meta { margin-top: 56px; max-width: 420px; }
        .hero__spectrum { margin-bottom: 10px; }
        .hero__meta span { font-size: 12.5px; letter-spacing: 0.03em; color: rgba(244,236,218,0.6); }

        .hero__floaters { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
        .floater {
          position: absolute; width: 46px; height: 46px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(34,28,21,0.55); border: 1px solid rgba(201,168,118,0.3);
          color: var(--gold); backdrop-filter: blur(6px);
          animation: floatY 7s ease-in-out infinite;
        }
        .floater--1 { top: 18%; right: 12%; animation-delay: 0s; }
        .floater--2 { top: 34%; right: 22%; animation-delay: 1.2s; }
        .floater--3 { top: 55%; right: 8%; animation-delay: 2.1s; }
        .floater--4 { top: 68%; right: 26%; animation-delay: .6s; }
        .floater--5 { top: 12%; right: 30%; animation-delay: 1.8s; }
        @keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }

        @media (max-width: 900px) {
          .floater { display: none; }
          .hero { min-height: 82vh; }
        }
      `}</style>
    </section>
  );
}
