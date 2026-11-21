import React,{useEffect,useState} from 'react';
import { MapPin, Clock, Landmark, Mountain, Sparkle } from 'lucide-react';
import api from '../services/api.js';
import { DEMO_BY_SLUG } from '../data/demoHeritage.js';
import { useLanguage } from '../context/LanguageContext.jsx';
const ICONS=[MapPin,Clock,Landmark,Mountain,Sparkle];
export default function QuickFacts({heritageId='bhangarh'}){
 const {pick}=useLanguage(); const [h,setH]=useState(DEMO_BY_SLUG[heritageId]||null);
 useEffect(()=>{api.heritage(heritageId).then(setH).catch(()=>setH(DEMO_BY_SLUG[heritageId]||null))},[heritageId]);
 if(!h)return null;
 const facts=[
  ['Location',[h.city,h.state].filter(Boolean).join(', ')||h.region],
  ['Period',h.period],
  ['Established / Built',h.built_year],
  ['Heritage Type',h.category],
  ['Architecture',h.architectural_style],
  ['Associated With',Array.isArray(h.associated_rulers)?h.associated_rulers.join(', '):h.associated_rulers],
  ['Region',h.region],
  ['Highlights',Array.isArray(h.interesting_facts)?h.interesting_facts[0]:h.interesting_facts]
 ].filter(x=>x[1]);
 return <section className="section quickfacts"><div className="container"><div className="section-head"><span className="eyebrow">At a Glance</span><h2>Quick Facts</h2></div><div className="qf-grid">{facts.slice(0,8).map(([label,value],i)=>{const Icon=ICONS[i%ICONS.length];return <div className="qf-card" key={label}><div className="qf-icon"><Icon size={18}/></div><div><span>{label}</span><strong>{value}</strong></div></div>})}</div></div><style>{`.quickfacts{background:var(--slate)}.quickfacts .section-head{margin-bottom:32px}.quickfacts .section-head h2{color:var(--vanilla)}.quickfacts .eyebrow{color:var(--yellow)}.qf-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.qf-card{background:rgba(255,243,176,.07);border:1px solid rgba(255,243,176,.16);border-radius:16px;padding:20px;display:flex;gap:14px;align-items:flex-start}.qf-icon{width:38px;height:38px;flex-shrink:0;border-radius:10px;background:var(--auburn);color:var(--vanilla);display:grid;place-items:center}.qf-card span{display:block;color:var(--yellow);font-size:10px;text-transform:uppercase;letter-spacing:.08em;font-weight:800;margin-bottom:5px}.qf-card strong{display:block;color:var(--vanilla);font-size:15px;line-height:1.4}@media(max-width:900px){.qf-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.qf-grid{grid-template-columns:1fr}}`}</style></section>
}
