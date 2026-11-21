import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useUI } from '../context/UIContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { suggestedQuestions, askVirasatAI } from '../services/aiService.js';
import api from '../services/api.js';

export default function AIGuide() {
  const { aiOpen, openAIGuide, closeAIGuide, aiPrefill } = useUI();
  const location = useLocation();
  const { t, lang, pick } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);
  const [heritageId, setHeritageId] = useState(null);
  const [heritageName, setHeritageName] = useState('Indian heritage');

  useEffect(() => {
    const match = location.pathname.match(/^\/heritage\/([^/]+)$/);
    const slug = location.pathname === '/bhangarh' ? 'bhangarh' : match?.[1];
    if (!slug) { setHeritageId(null); setHeritageName('Indian heritage'); return; }
    api.heritage(slug).then((h) => { setHeritageId(h.slug || h.id); setHeritageName(h.name); }).catch(() => { setHeritageId(slug); });
  }, [location.pathname]);

  useEffect(() => {
    setMessages([]);
  }, [location.pathname]);

  useEffect(() => {
    if (aiOpen && messages.length === 0) {
      setMessages([
        {
          role: 'ai',
          text:
            lang === 'hi'
              ? `नमस्ते! मैं विरासत एआई हूँ। ${heritageName} के इतिहास, स्थापत्य और सांस्कृतिक संदर्भ के बारे में पूछें।`
              : `Namaste! I'm VIRAASAT. Ask me anything about ${heritageName}'s history, architecture or cultural context.`,
          sources: []
        }
      ]);
    }
  }, [aiOpen, heritageName, lang]);

  useEffect(() => {
    if (aiOpen && aiPrefill) {
      setInput(aiPrefill);
    }
  }, [aiOpen, aiPrefill]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') closeAIGuide(); }
    if (aiOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [aiOpen, closeAIGuide]);

  async function send(text) {
    const q = (text ?? input).trim();
    if (!q) return;
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setTyping(true);
    try {
      try {
        const res = await api.chat(q, heritageId, lang);
        setMessages((m) => [...m, { role: 'ai', text: res.answer, sources: (res.sources || []).map(s => s.name || s) }]);
      } catch (backendError) {
        const local = await askVirasatAI(q, lang);
        setMessages((m) => [...m, { role: 'ai', text: local.text, sources: local.sources || [] }]);
      }
    } catch (e) {
      setMessages((m) => [...m, { role: 'ai', text: 'I could not answer that yet. Please try a question about the heritage record shown on this page.', sources: [] }]);
    } finally { setTyping(false); }
  }

  return (
    <>
      {!aiOpen && (
        <button className="ai-fab" onClick={() => openAIGuide()} aria-label={t.aiGuideTitle}>
          <Bot size={22} />
          <span>{t.aiGuideTitle}</span>
        </button>
      )}

      <div className={`ai-drawer ${aiOpen ? 'ai-drawer--open' : ''}`} id="ai-guide" role="dialog" aria-hidden={!aiOpen}>
        <div className="ai-drawer__header">
          <div className="ai-drawer__title">
            <Bot size={20} color="var(--gold)" />
            <div>
              <strong>VIRAASAT</strong>
              <span>Heritage Guide · Source-aware</span>
            </div>
          </div>
          <button className="icon-btn" onClick={closeAIGuide} aria-label="Close"><X size={20} /></button>
        </div>

        <div className="ai-drawer__body" ref={scrollRef}>
          {messages.map((m, i) => (
            <div key={i} className={`ai-msg ai-msg--${m.role}`}>
              {m.role === 'ai' && <Sparkles size={14} className="ai-msg__icon" />}
              <div className="ai-msg__bubble">
                <p>{m.text}</p>
                {m.sources && m.sources.length > 0 && (
                  <div className="ai-msg__sources">
                    <ShieldCheck size={12} />
                    <span>Sources: {m.sources.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {typing && (
            <div className="ai-msg ai-msg--ai">
              <Sparkles size={14} className="ai-msg__icon" />
              <div className="ai-msg__bubble ai-msg__typing">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>

        <div className="ai-drawer__suggested">
          {suggestedQuestions.slice(0, 4).map((q, i) => (
            <button key={i} onClick={() => send(pick(q))}>{pick(q)}</button>
          ))}
        </div>

        <form
          className="ai-drawer__input"
          onSubmit={(e) => { e.preventDefault(); send(); }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={lang === 'hi' ? 'अपना प्रश्न लिखें…' : 'Ask about Indian heritage…'}
            aria-label="Ask VIRAASAT"
          />
          <button type="submit" className="ai-drawer__send" aria-label="Send"><Send size={17} /></button>
        </form>
      </div>

      {aiOpen && <div className="ai-backdrop" onClick={closeAIGuide} />}

      <style>{`
        .ai-fab {
          position: fixed; bottom: 26px; right: 26px; z-index: 300;
          display: flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, var(--terracotta), var(--terracotta-dark));
          color: var(--paper); border: none; padding: 15px 22px; border-radius: 999px;
          font-weight: 700; font-size: 14px; box-shadow: var(--shadow-3);
          transition: transform .25s ease;
        }
        .ai-fab:hover { transform: translateY(-3px) scale(1.02); }
        @media (max-width: 640px) { .ai-fab span { display: none; } .ai-fab { padding: 15px; } }

        .ai-backdrop { position: fixed; inset: 0; background: rgba(10,8,6,0.5); z-index: 350; }

        .ai-drawer {
          position: fixed; top: 0; right: 0; height: 100%; width: 420px; max-width: 92vw;
          background: var(--charcoal-2); border-left: 1px solid var(--stone-line);
          z-index: 400; display: flex; flex-direction: column;
          transform: translateX(100%); transition: transform .4s cubic-bezier(.2,.8,.2,1);
          box-shadow: var(--shadow-3);
        }
        .ai-drawer--open { transform: translateX(0); }
        .ai-drawer__header { display: flex; align-items: center; justify-content: space-between; padding: 20px; border-bottom: 1px solid var(--stone-line); }
        .ai-drawer__title { display: flex; align-items: center; gap: 10px; }
        .ai-drawer__title div { display: flex; flex-direction: column; }
        .ai-drawer__title strong { font-family: var(--font-display); font-size: 18px; }
        .ai-drawer__title span { font-size: 11px; color: rgba(244,236,218,0.55); }

        .ai-drawer__body { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 16px; }
        .ai-msg { display: flex; gap: 8px; align-items: flex-start; }
        .ai-msg--user { justify-content: flex-end; }
        .ai-msg__icon { margin-top: 10px; flex-shrink: 0; color: var(--gold); }
        .ai-msg__bubble { max-width: 82%; background: var(--charcoal-3); border: 1px solid var(--stone-line); border-radius: 14px 14px 14px 4px; padding: 13px 15px; font-size: 14px; line-height: 1.55; }
        .ai-msg--user .ai-msg__bubble { background: var(--terracotta); border-color: var(--terracotta); border-radius: 14px 14px 4px 14px; color: var(--paper); }
        .ai-msg__sources { display: flex; align-items: center; gap: 6px; margin-top: 10px; font-size: 11px; color: var(--gold); border-top: 1px solid rgba(201,168,118,0.2); padding-top: 8px; }
        .ai-msg__typing { display: flex; gap: 4px; padding: 16px; }
        .ai-msg__typing span { width: 6px; height: 6px; border-radius: 50%; background: var(--sandstone); animation: bounce 1.2s infinite; }
        .ai-msg__typing span:nth-child(2) { animation-delay: .15s; }
        .ai-msg__typing span:nth-child(3) { animation-delay: .3s; }
        @keyframes bounce { 0%,60%,100% { transform: translateY(0); opacity: .5; } 30% { transform: translateY(-5px); opacity: 1; } }

        .ai-drawer__suggested { display: flex; flex-wrap: wrap; gap: 8px; padding: 0 20px 14px; }
        .ai-drawer__suggested button { font-size: 12px; padding: 8px 13px; border-radius: 999px; border: 1px solid var(--stone-line); background: transparent; color: var(--cream); }
        .ai-drawer__suggested button:hover { border-color: var(--gold); color: var(--gold); }

        .ai-drawer__input { display: flex; gap: 10px; padding: 16px 20px 20px; border-top: 1px solid var(--stone-line); }
        .ai-drawer__input input { flex: 1; background: var(--charcoal); border: 1px solid var(--stone-line); border-radius: 999px; padding: 12px 18px; color: var(--cream); font-size: 14px; outline: none; }
        .ai-drawer__input input:focus { border-color: var(--gold); }
        .ai-drawer__send { width: 42px; height: 42px; border-radius: 50%; background: var(--gold); color: var(--charcoal); border: none; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      `}</style>
    </>
  );
}
