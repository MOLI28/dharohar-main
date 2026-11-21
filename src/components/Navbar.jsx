import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Landmark } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import LanguageSelector from './LanguageSelector.jsx';

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 40); }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      function onKey(e) { if (e.key === 'Escape') setSearchOpen(false); }
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }
    return undefined;
  }, [searchOpen]);

  const results = [];
  function submitSearch(e) {
    e?.preventDefault();
    if (!query.trim()) return;
    setSearchOpen(false); navigate(`/search?q=${encodeURIComponent(query.trim())}`); setQuery('');
  }

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">
          <Link to="/" className="navbar__logo" onClick={() => setMobileOpen(false)}>
            <Landmark size={22} color="var(--gold)" />
            <span>धरोहर</span>
          </Link>

          <nav className="navbar__links navbar__links--desktop">
            <Link to="/">{t.navHome}</Link>
            <Link to="/explore">{t.navExplore}</Link>
            <a href="/#categories">{t.navCategories}</a>
            <a href="/bhangarh#ai-guide">{t.navAIGuide}</a>
          </nav>

          <div className="navbar__actions">
            <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search size={19} />
            </button>
            <div className="navbar__lang"><LanguageSelector compact /></div>
            <Link to="/explore" className="btn btn-primary btn-sm navbar__cta">{t.navExploreNearMe}</Link>
            <button className="icon-btn navbar__burger" aria-label="Menu" onClick={() => setMobileOpen((o) => !o)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="navbar__mobile">
            <Link to="/" onClick={() => setMobileOpen(false)}>{t.navHome}</Link>
            <Link to="/explore" onClick={() => setMobileOpen(false)}>{t.navExplore}</Link>
            <a href="/#categories" onClick={() => setMobileOpen(false)}>{t.navCategories}</a>
            <a href="/bhangarh#ai-guide" onClick={() => setMobileOpen(false)}>{t.navAIGuide}</a>
          </div>
        )}
      </header>

      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-modal="true">
          <div className="search-overlay__panel">
            <form className="search-overlay__bar" onSubmit={submitSearch}>
              <Search size={20} color="var(--sandstone)" />
              <input autoFocus type="text" placeholder={t.searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} />
              <button type="button" className="icon-btn" onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X size={20} />
              </button>
            </form>
            <div className="search-overlay__results">
              <p className="search-overlay__hint">Press Enter to search the Dharohar database. Local curated records are checked before Wikidata/Wikipedia fallback.</p>
            </div>
          </div>
          <div className="search-overlay__backdrop" onClick={() => setSearchOpen(false)} />
        </div>
      )}

      <style>{`
        .navbar {
          position: sticky; top: 0; z-index: 200; width: 100%;
          background: rgba(23,19,15,0.72);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(201,168,118,0.14);
          transition: padding .3s ease, background .3s ease;
        }
        .navbar__inner { display: flex; align-items: center; justify-content: space-between; padding: 20px 28px; transition: padding .3s ease; }
        .navbar--scrolled .navbar__inner { padding: 12px 28px; }
        .navbar--scrolled { background: rgba(23,19,15,0.92); box-shadow: var(--shadow-2); }
        .navbar__logo { display: flex; align-items: center; gap: 9px; font-family: var(--font-eyebrow); font-size: 16px; letter-spacing: 0.14em; color: var(--cream); }
        .navbar__logo em { color: var(--terracotta); font-style: normal; }
        .navbar__links--desktop { display: flex; gap: 34px; font-size: 14px; font-weight: 600; letter-spacing: 0.02em; }
        .navbar__links--desktop a { color: rgba(244,236,218,0.82); transition: color .2s ease; position: relative; }
        .navbar__links--desktop a:hover { color: var(--gold); }
        .navbar__actions { display: flex; align-items: center; gap: 12px; }
        .icon-btn { background: transparent; border: none; color: var(--cream); padding: 8px; border-radius: 999px; display: flex; transition: background .2s ease, color .2s ease; }
        .icon-btn:hover { background: rgba(201,168,118,0.14); color: var(--gold); }
        .navbar__burger { display: none; }
        .navbar__mobile { display: none; }

        @media (max-width: 900px) {
          .navbar__links--desktop { display: none; }
          .navbar__cta { display: none; }
          .navbar__lang { display: none; }
          .navbar__burger { display: flex; }
          .navbar__mobile {
            display: flex; flex-direction: column; gap: 2px; padding: 8px 20px 22px;
            border-top: 1px solid rgba(201,168,118,0.14);
          }
          .navbar__mobile a { padding: 13px 6px; font-size: 15px; font-weight: 600; color: var(--cream); border-bottom: 1px solid rgba(201,168,118,0.08); }
        }

        .search-overlay { position: fixed; inset: 0; z-index: 500; display: flex; align-items: flex-start; justify-content: center; padding-top: 12vh; }
        .search-overlay__backdrop { position: absolute; inset: 0; background: rgba(10,8,6,0.78); backdrop-filter: blur(4px); }
        .search-overlay__panel {
          position: relative; z-index: 1; width: min(600px, 90vw);
          background: var(--charcoal-2); border: 1px solid var(--stone-line);
          border-radius: var(--radius-l); box-shadow: var(--shadow-3); overflow: hidden;
          animation: searchIn .25s ease;
        }
        @keyframes searchIn { from { opacity: 0; transform: translateY(-14px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .search-overlay__bar { display: flex; align-items: center; gap: 12px; padding: 18px 20px; border-bottom: 1px solid var(--stone-line); }
        .search-overlay__bar input { flex: 1; background: transparent; border: none; color: var(--cream); font-size: 16px; outline: none; }
        .search-overlay__results { max-height: 50vh; overflow-y: auto; padding: 8px; }
        .search-overlay__hint { padding: 20px 14px; color: rgba(244,236,218,0.55); font-size: 14px; }
        .search-overlay__result { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 13px 14px; background: transparent; border: none; color: var(--cream); border-radius: var(--radius-s); font-size: 14.5px; transition: background .15s ease; }
        .search-overlay__result:hover { background: rgba(201,168,118,0.12); }
      `}</style>
    </>
  );
}
