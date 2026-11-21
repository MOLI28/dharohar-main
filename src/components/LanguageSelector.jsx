import React, { useState, useRef, useEffect } from 'react';
import { Languages, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function LanguageSelector({ compact }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const options = [
  {
    "code": "en",
    "label": "English",
    "flag": "🇬🇧"
  },
  {
    "code": "hi",
    "label": "हिंदी",
    "flag": "🇮🇳"
  },
  {
    "code": "bn",
    "label": "বাংলা",
    "flag": "🇧🇩"
  },
  {
    "code": "ta",
    "label": "தமிழ்",
    "flag": "🇮🇳"
  },
  {
    "code": "te",
    "label": "తెలుగు",
    "flag": "🇮🇳"
  },
  {
    "code": "mr",
    "label": "मराठी",
    "flag": "🇮🇳"
  },
  {
    "code": "gu",
    "label": "ગુજરાતી",
    "flag": "🇮🇳"
  },
  {
    "code": "kn",
    "label": "ಕನ್ನಡ",
    "flag": "🇮🇳"
  },
  {
    "code": "ml",
    "label": "മലയാളം",
    "flag": "🇮🇳"
  },
  {
    "code": "pa",
    "label": "ਪੰਜਾਬੀ",
    "flag": "🇮🇳"
  },
  {
    "code": "or",
    "label": "ଓଡ଼ିଆ",
    "flag": "🇮🇳"
  },
  {
    "code": "as",
    "label": "অসমীয়া",
    "flag": "🇮🇳"
  }
];

  return (
    <div className="lang-select" ref={ref}>
      <button
        className="lang-btn"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <Languages size={17} />
        {!compact && <span>{options.find((o) => o.code === lang).flag} {options.find((o) => o.code === lang).label}</span>}
      </button>
      {open && (
        <ul className="lang-menu" role="listbox">
          {options.map((o) => (
            <li key={o.code}>
              <button
                role="option"
                aria-selected={lang === o.code}
                onClick={() => { setLang(o.code); setOpen(false); }}
              >
                <span>{o.flag} {o.label}</span>
                {lang === o.code && <Check size={15} />}
              </button>
            </li>
          ))}
        </ul>
      )}
      <style>{`
        .lang-select { position: relative; }
        .lang-btn {
          display: flex; align-items: center; gap: 7px;
          background: transparent; border: 1px solid rgba(244,236,218,0.28);
          color: var(--cream); padding: 9px 14px; border-radius: 999px;
          font-size: 13px; font-weight: 600; transition: border-color .2s ease, color .2s ease;
        }
        .lang-btn:hover { border-color: var(--gold); color: var(--gold); }
        .lang-menu {
          position: absolute; top: calc(100% + 8px); right: 0; min-width: 150px;
          background: var(--charcoal-2); border: 1px solid var(--stone-line);
          border-radius: var(--radius-m); box-shadow: var(--shadow-3); overflow: hidden; z-index: 40;
        }
        .lang-menu button {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          gap: 10px; padding: 11px 14px; background: transparent; border: none; color: var(--cream);
          font-size: 13.5px; text-align: left; transition: background .15s ease;
        }
        .lang-menu button:hover { background: rgba(201,168,118,0.12); }
      `}</style>
    </div>
  );
}
