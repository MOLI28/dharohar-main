import React, { useState } from 'react';
import { claims } from '../data/claims.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useUI } from '../context/UIContext.jsx';
import useReveal from '../hooks/useReveal.js';
import { ShieldCheck } from 'lucide-react';

const FILTERS = [
  { key: 'all', labelKey: 'filterAll' },
  { key: 'verified', labelKey: 'filterVerified' },
  { key: 'folklore', labelKey: 'filterFolklore' },
  { key: 'unverified', labelKey: 'filterUnverified' }
];

export default function FactLegend() {
  const { t, pick } = useLanguage();
  const { openSource } = useUI();
  const ref = useReveal();
  const [filter, setFilter] = useState('all');

  const visible = filter === 'all' ? claims : claims.filter((c) => c.evidence === filter);

  return (
    <section className="section section--cream" id="fact-vs-folklore" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t.factEyebrow}</span>
          <h2>{t.factTitle}</h2>
          <p>Every claim about Bhangarh is classified by evidence — not by how often it is repeated.</p>
        </div>

        <div className="fl__filters reveal">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`fl__filter ${filter === f.key ? 'fl__filter--active' : ''} ${f.key}`}
              onClick={() => setFilter(f.key)}
            >
              {t[f.labelKey]}
            </button>
          ))}
        </div>

        <div className="fl__grid">
          {visible.map((c, i) => (
            <div className={`fl__card reveal reveal-delay-${(i % 3) + 1}`} key={c.id}>
              <span className={`evidence-badge evidence-${c.evidence}`}>
                <span className="dot" /> {evidenceLabel(c.evidence, t)}
              </span>
              <p className="fl__claim">&ldquo;{pick(c.claim)}&rdquo;</p>
              <p className="fl__explain">{pick(c.explanation)}</p>
              <button className="fl__source" onClick={() => openSource(sourceIdFor(c.source))}>
                <ShieldCheck size={13} /> {c.source}
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .fl__filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 34px; }
        .fl__filter { padding: 10px 20px; border-radius: 999px; border: 1px solid rgba(36,29,21,0.22); background: transparent; color: var(--ink); font-size: 13.5px; font-weight: 700; transition: all .2s ease; }
        .fl__filter--active.all { background: var(--ink); color: var(--paper); border-color: var(--ink); }
        .fl__filter--active.verified { background: var(--verified); color: #fff; border-color: var(--verified); }
        .fl__filter--active.folklore { background: var(--folklore); color: #2a1d05; border-color: var(--folklore); }
        .fl__filter--active.unverified { background: var(--unverified); color: #fff; border-color: var(--unverified); }

        .fl__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 980px) { .fl__grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .fl__grid { grid-template-columns: 1fr; } }
        .fl__card { background: var(--cream-2); border: 1px solid rgba(36,29,21,0.08); border-radius: var(--radius-m); padding: 24px; display: flex; flex-direction: column; gap: 14px; transition: transform .3s ease, box-shadow .3s ease; }
        .fl__card:hover { transform: translateY(-5px); box-shadow: 0 14px 30px rgba(36,29,21,0.12); }
        .fl__claim { font-family: var(--font-display); font-size: 19px; font-style: italic; color: var(--ink); line-height: 1.45; }
        .fl__explain { font-size: 13.5px; color: var(--ink-soft); }
        .fl__source { align-self: flex-start; display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: var(--terracotta-dark); background: rgba(182,96,58,0.1); border: 1px solid rgba(182,96,58,0.25); padding: 7px 12px; border-radius: 999px; margin-top: auto; }
        .fl__source:hover { background: rgba(182,96,58,0.2); }
      `}</style>
    </section>
  );
}

function evidenceLabel(evidence, t) {
  if (evidence === 'verified') return t.filterVerified;
  if (evidence === 'folklore') return t.filterFolklore;
  if (evidence === 'unverified') return t.filterUnverified;
  return 'Interpretation';
}
function sourceIdFor(name) {
  if (name === 'ASI') return 'asi';
  if (name === 'Rajasthan Tourism') return 'rajasthan-tourism';
  if (name === 'Local oral tradition') return 'oral-tradition';
  if (name === 'Popular culture / media') return 'popular-media';
  if (name === 'Historical interpretation') return 'incredible-india';
  return 'incredible-india';
}
