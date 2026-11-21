import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Github, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo"><Landmark size={20} color="var(--gold)" /> धरोहर</span>
          <p>{t.footerTagline}</p>
        </div>

        <div className="footer__cols">
          <div>
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/bhangarh">Bhangarh Fort</Link>
            <a href="/bhangarh#archive">Digital Archive</a>
          </div>
          <div>
            <h4>Trust</h4>
            <a href="/bhangarh#fact-vs-folklore">Fact vs Folklore</a>
            <a href="/bhangarh#preservation">Preservation</a>
            <a href="/bhangarh#ai-guide">AI Guide</a>
          </div>
          <div>
            <h4>Sources</h4>
            <span className="footer__static">Archaeological Survey of India</span>
            <span className="footer__static">Rajasthan Tourism</span>
            <span className="footer__static">Incredible India</span>
          </div>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} VIRAASAT — a heritage buildathon prototype.</span>
        <div className="footer__icons">
          <Github size={16} /> <Mail size={16} />
        </div>
      </div>

      <style>{`
        .footer { background: var(--charcoal); border-top: 1px solid var(--stone-line); padding-top: 70px; }
        .footer__inner { display: flex; justify-content: space-between; gap: 50px; flex-wrap: wrap; padding-bottom: 50px; }
        .footer__logo { font-family: var(--font-eyebrow); font-size: 16px; letter-spacing: 0.14em; display: flex; align-items: center; gap: 9px; }
        .footer__logo em { color: var(--terracotta); font-style: normal; }
        .footer__brand p { margin-top: 14px; max-width: 280px; color: rgba(244,236,218,0.6); font-size: 14px; }
        .footer__cols { display: flex; gap: 60px; flex-wrap: wrap; }
        .footer__cols h4 { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--sandstone); margin-bottom: 14px; }
        .footer__cols > div { display: flex; flex-direction: column; gap: 10px; }
        .footer__cols a, .footer__static { font-size: 14px; color: rgba(244,236,218,0.72); }
        .footer__cols a:hover { color: var(--gold); }
        .footer__bottom { border-top: 1px solid var(--stone-line); padding: 22px 28px; display: flex; justify-content: space-between; align-items: center; font-size: 12.5px; color: rgba(244,236,218,0.45); flex-wrap: wrap; gap: 10px; }
        .footer__icons { display: flex; gap: 14px; }
      `}</style>
    </footer>
  );
}
