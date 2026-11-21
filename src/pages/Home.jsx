import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero.jsx';
import HeritageCard from '../components/HeritageCard.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import useReveal from '../hooks/useReveal.js';
import { DEMO_HERITAGE } from '../data/demoHeritage.js';
import api from '../services/api.js';

const CATEGORY_META = [
  { key:'Monuments & Places', icon:'🏰', title:'Monuments & Places', desc:'Historical monuments, archaeological sites and heritage locations.' },
  { key:'Temples', icon:'🛕', title:'Temples', desc:'Sacred architecture and living temple traditions across India.' },
  { key:'Crafts', icon:'🎨', title:'Crafts', desc:'Traditional crafts, paintings, textiles and artisan practices.' },
  { key:'Stories & Traditions', icon:'📖', title:'Stories & Traditions', desc:'Folk stories, festivals, rituals and living cultural practices.' },
  { key:'Music & Dance', icon:'🎶', title:'Music & Dance', desc:'Classical and folk music and dance traditions.' }
];

export default function Home() {
  const { t } = useLanguage();
  const [records, setRecords] = useState(DEMO_HERITAGE);
  const featureRef = useReveal();
  const hiddenRef = useReveal();
  const trustRef = useReveal();

  useEffect(() => {
    api.listHeritage().then(rows => {
      if (Array.isArray(rows) && rows.length) setRecords(rows);
    }).catch(() => {});
  }, []);

  const getCategoryImage = (key) => records.find(x => x.category === key)?.images?.[0];
  const featured = records.filter(x => ['amber-fort','taj-mahal','hawa-mahal','konark-sun-temple','khajuraho','red-fort'].includes(x.slug));
  const hidden = records.filter(x => ['sanchi-stupa','madhubani-painting','pattachitra','rani-ki-vav'].includes(x.slug));

  return (
    <main>
      <Hero />

      <section className="section" id="categories" ref={featureRef}>
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Explore Heritage</span>
            <h2>India's heritage, made discoverable.</h2>
            <p>Browse source-backed monuments, temples, crafts, traditions, music and dance from the Dharohar demo archive.</p>
          </div>
          <div className="cat-grid">
            {CATEGORY_META.map((c, i) => (
              <div className={`reveal reveal-delay-${(i % 3) + 1}`} key={c.key}>
                <HeritageCard
                  icon={c.icon}
                  title={c.title}
                  description={c.desc}
                  image={getCategoryImage(c.key)}
                  to={`/search?q=${encodeURIComponent(c.key)}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream" ref={hiddenRef}>
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Featured Discoveries</span>
            <h2>Go beyond the usual itinerary.</h2>
            <p>Every featured card opens a full heritage record with history, timeline, internal site explorer, audio and source information.</p>
          </div>
          <div className="heritage-grid">
            {featured.map((x, i) => (
              <div className="reveal" key={x.slug}>
                <HeritageCard title={x.name} description={x.short_description} image={x.images?.[0]} to={`/heritage/${x.slug}`} badge={i < 3 ? 'Featured' : undefined} />
              </div>
            ))}
          </div>

          <div className="section-head hidden-heading">
            <span className="eyebrow">Hidden Heritage</span>
            <h2>Discover the stories that don't always make the itinerary.</h2>
            <p>Lesser-known cultural discoveries from the demo archive, selected by region and category rather than randomly generated.</p>
          </div>
          <div className="heritage-grid">
            {hidden.map(x => <HeritageCard key={x.slug} title={x.name} description={x.short_description} image={x.images?.[0]} to={`/heritage/${x.slug}`} />)}
          </div>

          <div className="stats-grid reveal">
            <div><strong>{records.length}+</strong><span>Demo Records</span></div>
            <div><strong>Source-Backed</strong><span>Knowledge</span></div>
            <div><strong>12</strong><span>Indian Languages Ready</span></div>
            <div><strong>Database</strong><span>SQLite / PostgreSQL Ready</span></div>
          </div>
        </div>
      </section>

      <section className="section trust-teaser" ref={trustRef}>
        <div className="container trust-teaser__inner reveal">
          <span className="eyebrow">{t.trustEyebrow}</span>
          <h2>{t.trustTitle}</h2>
          <p className="trust-teaser__statement">{t.trustStatement}</p>
          <div className="evidence-spectrum" style={{ maxWidth: 480, margin: '30px auto 0' }} />
          <div className="trust-teaser__badges">
            <span className="evidence-badge evidence-verified"><span className="dot" />Historical Record</span>
            <span className="evidence-badge evidence-folklore"><span className="dot" />Oral Tradition</span>
            <span className="evidence-badge evidence-interpretation"><span className="dot" />Interpretation</span>
            <span className="evidence-badge evidence-unverified"><span className="dot" />Unverified Claim</span>
          </div>
        </div>
      </section>

      <style>{`
        .cat-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:18px}.heritage-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}.hidden-heading{margin-top:90px}.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:50px}.stats-grid div{background:var(--slate);color:var(--vanilla);border-radius:16px;padding:22px;text-align:center}.stats-grid strong{display:block;color:var(--yellow);font-size:22px}.stats-grid span{font-size:12px}.trust-teaser__inner{text-align:center;max-width:620px;margin:0 auto}.trust-teaser__statement{margin-top:18px;font-size:18px;color:rgba(255,243,176,.8)}.trust-teaser__badges{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:26px}
        @media(max-width:1050px){.cat-grid{grid-template-columns:repeat(3,1fr)}}@media(max-width:900px){.heritage-grid{grid-template-columns:repeat(2,1fr)}.stats-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:650px){.cat-grid,.heritage-grid{grid-template-columns:1fr}.stats-grid{grid-template-columns:1fr}}
      `}</style>
    </main>
  );
}
