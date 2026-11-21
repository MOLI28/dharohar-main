import React, { useEffect } from 'react';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';
import { useUI } from '../context/UIContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { sources } from '../data/sources.js';

const CONFIDENCE_LABEL = {
  high: { en: 'High Confidence', hi: 'उच्च विश्वसनीयता', cls: 'evidence-verified' },
  folklore: { en: 'Folklore / Oral Tradition', hi: 'लोककथा / मौखिक परंपरा', cls: 'evidence-folklore' },
  unverified: { en: 'Unverified', hi: 'असत्यापित', cls: 'evidence-unverified' }
};

export default function SourceDrawer() {
  const { sourceId, closeSource } = useUI();
  const { lang, pick } = useLanguage();
  const source = sources.find((s) => s.id === sourceId);
  const open = Boolean(source);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') closeSource(); }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeSource]);

  if (!open) return null;
  const conf = CONFIDENCE_LABEL[source.confidence] || CONFIDENCE_LABEL.high;

  return (
    <div className="sd-backdrop" role="dialog" aria-modal="true" aria-label="Source details">
      <div className="sd-backdrop__overlay" onClick={closeSource} />
      <aside className="sd-panel">
        <button className="sd-close" onClick={closeSource} aria-label="Close"><X size={20} /></button>
        <span className={`evidence-badge ${conf.cls}`}><span className="dot" /> {conf[lang] || conf.en}</span>
        <h3 className="sd-name"><ShieldCheck size={20} color="var(--gold)" /> {source.name}</h3>
        <div className="sd-block">
          <strong>Source Type</strong>
          <p>{pick(source.type)}</p>
        </div>
        <div className="sd-block">
          <strong>What This Supports</strong>
          <p>{pick(source.supports)}</p>
        </div>
        {source.url && (
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="btn btn-gold sd-link">
            View Source <ExternalLink size={15} />
          </a>
        )}
        {!source.url && <p className="sd-note">This source represents community-transmitted knowledge and has no single official record.</p>}
      </aside>

      <style>{`
        .sd-backdrop { position: fixed; inset: 0; z-index: 550; }
        .sd-backdrop__overlay { position: absolute; inset: 0; background: rgba(10,8,6,0.6); backdrop-filter: blur(3px); }
        .sd-panel {
          position: absolute; top: 0; right: 0; height: 100%; width: 400px; max-width: 90vw;
          background: var(--charcoal-2); border-left: 1px solid var(--stone-line); padding: 32px;
          display: flex; flex-direction: column; gap: 18px; animation: sdIn .35s cubic-bezier(.2,.8,.2,1);
          overflow-y: auto;
        }
        @keyframes sdIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .sd-close { position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: var(--cream); opacity: .7; }
        .sd-close:hover { opacity: 1; }
        .sd-name { display: flex; align-items: center; gap: 10px; font-size: 24px; margin-top: 6px; }
        .sd-block strong { font-size: 11.5px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--sandstone); }
        .sd-block p { margin-top: 6px; color: rgba(244,236,218,0.75); font-size: 14.5px; line-height: 1.6; }
        .sd-link { margin-top: auto; align-self: flex-start; }
        .sd-note { font-size: 13px; color: rgba(244,236,218,0.5); font-style: italic; margin-top: auto; }
      `}</style>
    </div>
  );
}
