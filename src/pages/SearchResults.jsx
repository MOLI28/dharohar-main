import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, MapPin, ShieldCheck } from 'lucide-react';
import api from '../services/api.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { DEMO_HERITAGE } from '../data/demoHeritage.js';

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const { t } = useLanguage();
  const [data,setData]=useState({results:[]});
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  useEffect(()=>{ let active=true; setLoading(true); setError(''); api.search(q).then(x=>active&&setData(x)).catch(()=>{ if(!active)return; const term=q.trim().toLowerCase(); const results=DEMO_HERITAGE.filter(h=>{const hay=[h.name,h.category,h.subcategory,h.state,h.city,h.region,h.short_description].filter(Boolean).join(' ').toLowerCase();return !term||hay.includes(term)}).map(h=>({id:h.slug,name:h.name,category:h.category,state:h.state,city:h.city,description:h.short_description,image:h.images?.[0],source:'Dharohar Demo Database'})); setData({results,query:q}); }).finally(()=>active&&setLoading(false)); return()=>{active=false}; },[q]);
  return <main className="section section--cream">
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">Discover</span><h2>Search results</h2>
        <p>{q ? <>Results for <strong>“{q}”</strong> · {data.results?.length||0} relevant records</> : 'Search the curated heritage archive.'}</p>
      </div>
      {loading && <p>Searching the Dharohar database…</p>}
      {error && <div className="api-error">{error}</div>}
      {!loading && !error && data.results?.length===0 && <div className="empty-state"><Search size={28}/><h3>No reliable match found</h3><p>Try another spelling, category, monument, craft, tradition, music or dance form.</p></div>}
      <div className="results-grid">
        {data.results?.map(r => r.source?.startsWith('Dharohar') ? (
          <Link className="result-card" key={r.id} to={`/heritage/${r.id}`}>
            {r.image ? <img src={r.image} alt="" /> : <div className="result-image-placeholder"><MapPin/></div>}
            <div className="result-body">
              <div className="result-meta"><span>{r.category}</span><span><ShieldCheck size={13}/> {r.source}</span></div>
              <h3>{r.name}</h3><p>{r.description}</p>
              {(r.city||r.state)&&<small>📍 {[r.city,r.state].filter(Boolean).join(', ')}</small>}
            </div>
          </Link>
        ) : (
          <a className="result-card" key={r.id} href={r.wikipedia_url || `https://www.wikidata.org/wiki/${r.id}`} target="_blank" rel="noreferrer">
            <div className="result-image-placeholder"><MapPin/></div>
            <div className="result-body">
              <div className="result-meta"><span>{r.category}</span><span>{r.source}</span></div>
              <h3>{r.name}</h3><p>{r.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
    <style>{`.results-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.result-card{background:var(--vanilla);border:1px solid rgba(51,92,103,.15);border-radius:18px;overflow:hidden;color:var(--slate);transition:.25s}.result-card:hover{transform:translateY(-5px);box-shadow:var(--shadow-2)}.result-card img,.result-image-placeholder{width:100%;height:190px;object-fit:cover}.result-image-placeholder{display:grid;place-items:center;background:var(--slate);color:var(--yellow)}.result-body{padding:20px}.result-body h3{color:var(--auburn);font-size:24px;margin:8px 0}.result-body p{color:#49606a;font-size:14px}.result-body small{display:block;margin-top:12px}.result-meta{display:flex;justify-content:space-between;gap:8px;font-size:10px;text-transform:uppercase;letter-spacing:.06em}.result-meta span:last-child{color:var(--auburn)}.empty-state,.api-error{padding:40px;border:1px dashed rgba(51,92,103,.3);border-radius:16px;text-align:center}.api-error{color:var(--auburn)}@media(max-width:900px){.results-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.results-grid{grid-template-columns:1fr}}`}</style>
  </main>
}
