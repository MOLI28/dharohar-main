import React,{useEffect,useState} from 'react';
import { MapPin } from 'lucide-react';
import api from '../services/api.js';
import { useParams } from 'react-router-dom';
import { bhangarhSite, aboutSection } from '../data/bhangarh.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useUI } from '../context/UIContext.jsx';
import useReveal from '../hooks/useReveal.js';

import QuickFacts from '../components/QuickFacts.jsx';
import Timeline from '../components/Timeline.jsx';
import ArchitectureExplorer from '../components/ArchitectureExplorer.jsx';
import FactLegend from '../components/FactLegend.jsx';
import AudioGuide from '../components/AudioGuide.jsx';

export default function Bhangarh() {
  const { t, pick } = useLanguage();
  const { openAIGuide } = useUI();
  const { id = 'bhangarh' } = useParams();
  const [record,setRecord]=useState(null);
  useEffect(()=>{api.heritage(id).then(setRecord).catch(()=>setRecord(null));},[id]);
  const site = record || bhangarhSite;
  const aboutRef = useReveal();

  return (
    <main>
      {/* --- Bhangarh Hero --- */}
      <section className="bh-hero">
        <div
          className="bh-hero__bg"
          style={{ backgroundImage: `url(${(site.images&&site.images[0]) || bhangarhSite.heroImage})` }}
        />
        <div className="bh-hero__scrim" />
        <div className="container bh-hero__content">
          <div className="bh-hero__locate"><MapPin size={15} /> {record ? `${record.city ? record.city+', ' : ''}${record.state || ''}` : pick({ en: bhangarhSite.location, hi: bhangarhSite.locationHi })}</div>
          <h1 className="bh-hero__title">{record?.name || 'BHANGARH FORT'}</h1>
          <p className="bh-hero__subtitle">{record?.short_description || pick(bhangarhSite.heroSubtitle)}</p>
          <div className="bh-hero__tags">
            {(bhangarhSite.tags).map((tag, i) => <span className="tag" key={tag}>{pick({ en: tag, hi: bhangarhSite.tagsHi[i] })}</span>)}
          </div>
          <div className="bh-hero__actions">
            <a href="#explore" className="btn btn-primary">{t.exploreFort}</a>
            <button className="btn btn-ghost" onClick={() => openAIGuide()}>{t.askAIGuide}</button>
            <a href="#audio" className="btn btn-ghost">{t.listenStory}</a>
          </div>
        </div>
      </section>

      <QuickFacts />

      {/* --- About --- */}
      <section className="section section--cream" ref={aboutRef}>
        <div className="container about">
          <div className="about__col reveal">
            <span className="eyebrow">{t.aboutEyebrow}</span>
            <h2>{pick(aboutSection.heading)}</h2>
          </div>
          <div className="about__col about__text reveal reveal-delay-1">
            {aboutSection.paragraphs.map((p, i) => (
              <p key={i}>{pick(p)}</p>
            ))}
          </div>
        </div>
        <style>{`
          .about { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 50px; }
          @media (max-width: 900px) { .about { grid-template-columns: 1fr; } }
          .about__col h2 { margin-top: 14px; font-size: clamp(28px, 3.4vw, 40px); }
          .about__text p { color: var(--ink-soft); font-size: 16px; line-height: 1.8; margin-bottom: 18px; }
        `}</style>
      </section>

      <Timeline heritageId={id} />

      <ArchitectureExplorer heritageId={id} />
      <FactLegend />
      <div id="audio"><AudioGuide heritageId={id}/></div>
      <div className="trust-inline section section--cream"><div className="container"><div className="section-head"><span className="eyebrow">Source & Trust</span><h2>Built on Heritage. Grounded in Evidence.</h2><p>Information is retrieved from the Dharohar curated database first, with Wikidata/Wikipedia used only as external fallback.</p></div></div></div>
      {/* --- AI Guide anchor for nav link --- */}
      <div id="ai-guide-anchor" />

      <style>{`
        .bh-hero { position: relative; min-height: 78vh; display: flex; align-items: flex-end; overflow: hidden; }
        .bh-hero__bg { position: absolute; inset: 0; background-size: cover; background-position: center; background-color: #2c2013; }
        .bh-hero__scrim { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(23,19,15,0.35) 0%, rgba(23,19,15,0.55) 55%, var(--charcoal) 100%); }
        .bh-hero__content { position: relative; z-index: 2; padding-bottom: 70px; padding-top: 120px; }
        .bh-hero__locate { display: inline-flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 700; letter-spacing: 0.04em; color: var(--sandstone); background: rgba(34,28,21,0.6); border: 1px solid rgba(201,168,118,0.3); padding: 8px 16px; border-radius: 999px; }
        .bh-hero__title { margin-top: 22px; font-size: clamp(44px, 8vw, 92px); letter-spacing: 0.02em; text-shadow: 0 6px 30px rgba(0,0,0,0.6); }
        .bh-hero__subtitle { margin-top: 14px; font-size: 19px; max-width: 520px; color: rgba(244,236,218,0.85); font-style: italic; font-family: var(--font-display); }
        .bh-hero__tags { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 24px; }
        .bh-hero__actions { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 32px; }
      `}</style>
    </main>
  );
}
