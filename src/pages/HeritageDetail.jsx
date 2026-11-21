import React,{useEffect,useState} from 'react';
import {useParams,Link} from 'react-router-dom';
import {MapPin,ShieldCheck,ArrowLeft} from 'lucide-react';
import api from '../services/api.js';
import QuickFacts from '../components/QuickFacts.jsx';
import Timeline from '../components/Timeline.jsx';
import ArchitectureExplorer from '../components/ArchitectureExplorer.jsx';
import AudioGuide from '../components/AudioGuide.jsx';
import { DEMO_BY_SLUG } from '../data/demoHeritage.js';

export default function HeritageDetail(){
 const {id}=useParams(); const [h,setH]=useState(DEMO_BY_SLUG[id] || null); const [loading,setLoading]=useState(true);
 useEffect(()=>{let alive=true; setLoading(true); api.heritage(id).then(x=>{if(alive)setH(x)}).catch(()=>{if(alive)setH(DEMO_BY_SLUG[id] || null)}).finally(()=>alive&&setLoading(false)); return()=>{alive=false}},[id]);
 if(loading && !h) return <main className="section"><div className="container"><p>Loading heritage record…</p></div></main>;
 if(!h) return <main className="section"><div className="container"><h2>Heritage record not found</h2><Link to="/search?q=heritage" className="btn btn-primary">Back to Search</Link></div></main>;
 const image=h.images?.[0];
 return <main>
  <section className="hd-hero" style={{backgroundImage:`url(${image})`}}>
   <div className="hd-scrim"/><div className="container hd-content">
    <Link to="/search?q=heritage" className="hd-back"><ArrowLeft size={15}/> Back to discovery</Link>
    <span className="hd-loc"><MapPin size={15}/> {[h.city,h.state].filter(Boolean).join(', ') || h.region}</span>
    <h1>{h.name}</h1><p>{h.short_description}</p>
    <span className="source-pill"><ShieldCheck size={14}/> {h.verification_status==='verified'?'Dharohar Curated Database':'External Source'}</span>
   </div>
  </section>
  <QuickFacts heritageId={id}/>
  <section className="section section--cream"><div className="container hd-two"><div><span className="eyebrow">History</span><h2>Historical Context</h2></div><div><p>{h.historical_significance||h.long_description||'Verified historical context is being expanded in the curated dataset.'}</p><p className="hd-cultural">{h.cultural_significance||'Cultural significance is recorded as source-backed information when available.'}</p></div></div></section>
  <Timeline heritageId={id}/>
  <ArchitectureExplorer heritageId={id}/>
  <div id="audio"><AudioGuide heritageId={id}/></div>
  <section className="section section--cream"><div className="container"><div className="section-head"><span className="eyebrow">Source & Trust</span><h2>Built on Heritage. Grounded in Evidence.</h2><p>Primary demo content comes from the Dharohar curated database. External references are shown separately.</p></div><div className="source-list">{(h.sources||[]).map((s,i)=><a className="source-item" href={s.url} target="_blank" rel="noreferrer" key={i}><ShieldCheck size={14}/>{s.name}</a>)}</div></div></section>
  <style>{`.hd-hero{position:relative;min-height:70vh;background-size:cover;background-position:center;display:flex;align-items:flex-end}.hd-scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(51,92,103,.15),rgba(51,92,103,.78) 72%,var(--slate))}.hd-content{position:relative;z-index:2;padding-top:130px;padding-bottom:70px}.hd-content h1{font-size:clamp(44px,7vw,82px);color:var(--vanilla);margin-top:22px}.hd-content>p{max-width:720px;font-size:18px;color:rgba(255,243,176,.82);margin-top:12px}.hd-loc,.source-pill,.hd-back{display:inline-flex;align-items:center;gap:7px}.hd-loc{margin-top:25px;background:rgba(255,243,176,.15);padding:8px 14px;border-radius:999px;color:var(--yellow)}.source-pill{margin-top:18px;padding:7px 12px;border:1px solid rgba(255,243,176,.3);border-radius:999px;font-size:12px;color:var(--vanilla)}.hd-back{color:var(--vanilla);font-size:13px}.hd-two{display:grid;grid-template-columns:.8fr 1.2fr;gap:50px}.hd-two h2{color:var(--slate);margin-top:14px}.hd-two p{color:var(--slate);font-size:17px;line-height:1.8}.hd-cultural{margin-top:18px}.source-list{display:flex;gap:12px;flex-wrap:wrap}.source-item{display:flex;align-items:center;gap:8px;padding:12px 16px;border:1px solid rgba(51,92,103,.2);border-radius:999px;color:var(--slate);background:var(--vanilla)}@media(max-width:800px){.hd-two{grid-template-columns:1fr}}`}</style>
 </main>
}
