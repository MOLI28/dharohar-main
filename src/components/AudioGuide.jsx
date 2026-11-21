import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, Headphones } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import useReveal from '../hooks/useReveal.js';
import api from '../services/api.js';
import { DEMO_BY_SLUG } from '../data/demoHeritage.js';

const NARRATION = {
  en: "Bhangarh Fort sits in the Aravalli hills of Rajasthan, a historic fortified settlement founded in the late sixteenth century. Behind its gates lie temples, a royal palace, and a bazaar street that once bustled with trade. Alongside this documented history, Bhangarh also carries a rich tradition of folklore — stories of a curse, a princess, and a mystic — passed down through generations. Virasat AI preserves both layers of Bhangarh's story, while always making clear which is history, and which is legend.",
  hi: 'भानगढ़ किला राजस्थान की अरावली पहाड़ियों में स्थित है, जो सोलहवीं शताब्दी के अंत में स्थापित एक ऐतिहासिक सुरक्षा-प्राचीर युक्त बस्ती है। इसके द्वारों के पीछे मंदिर, एक राजमहल, और एक बाज़ार गली है जो कभी व्यापार से गुलज़ार रहती थी। इस प्रलेखित इतिहास के साथ-साथ, भानगढ़ में लोककथा की एक समृद्ध परंपरा भी है — एक श्राप, एक राजकुमारी, और एक साधु की गाथाएँ — जो पीढ़ियों से चली आ रही हैं। विरासत एआई भानगढ़ की कहानी की दोनों परतों को सहेजता है, और हमेशा यह स्पष्ट करता है कि क्या इतिहास है और क्या किंवदंती।'
};

export default function AudioGuide({heritageId='bhangarh'}) {
  const { t, lang } = useLanguage();
  const ref = useReveal();
  const [state, setState] = useState('idle'); // idle | playing | paused
  const [heritage, setHeritage] = useState(DEMO_BY_SLUG[heritageId] || null);
  useEffect(()=>{setHeritage(DEMO_BY_SLUG[heritageId]||null); api.heritage(heritageId).then(setHeritage).catch(()=>{});},[heritageId]);
  const [supported, setSupported] = useState(true);
  const utterRef = useRef(null);

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
    return () => { if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel(); };
  }, []);

  useEffect(() => {
    // stop narration when language changes mid-play
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    setState('idle');
  }, [lang]);

  function play() {
    if (!supported) return;
    const synth = window.speechSynthesis;
    if (state === 'paused') {
      synth.resume();
      setState('playing');
      return;
    }
    synth.cancel();
    const fallback = heritage ? `${heritage.name}. ${heritage.short_description || ''} ${heritage.historical_significance || ''} ${heritage.cultural_significance || ''}` : (NARRATION[lang] || NARRATION.en);
    const utterText = fallback;
    const utter = new SpeechSynthesisUtterance(utterText);
    utter.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utter.rate = 0.95;
    utter.onend = () => setState('idle');
    utter.onerror = () => setState('idle');
    utterRef.current = utter;
    synth.speak(utter);
    setState('playing');
  }

  function pause() {
    if (!supported) return;
    window.speechSynthesis.pause();
    setState('paused');
  }

  function stop() {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setState('idle');
  }

  return (
    <section className="section audio" ref={ref}>
      <div className="container">
        <div className="audio__card reveal">
          <div className="audio__icon"><Headphones size={26} /></div>
          <div className="audio__text">
            <h3>🎧 Listen to {heritage?.name || t.audioTitle.replace('Listen to this Heritage','this Heritage')}</h3>
            <p>{supported ? 'A short narrated introduction, read aloud by your browser.' : 'Audio narration is not supported in this browser.'}</p>
          </div>
          <div className="audio__controls">
            <button onClick={play} disabled={!supported || state === 'playing'} aria-label="Play"><Play size={17} /></button>
            <button onClick={pause} disabled={!supported || state !== 'playing'} aria-label="Pause"><Pause size={17} /></button>
            <button onClick={stop} disabled={!supported || state === 'idle'} aria-label="Stop"><Square size={15} /></button>
          </div>
        </div>
      </div>

      <style>{`
        .audio__card { display: flex; align-items: center; gap: 22px; background: var(--charcoal-2); border: 1px solid var(--stone-line); border-radius: var(--radius-l); padding: 30px; flex-wrap: wrap; }
        .audio__icon { width: 54px; height: 54px; border-radius: 50%; background: rgba(201,152,47,0.14); color: var(--gold); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .audio__text { flex: 1; min-width: 220px; }
        .audio__text h3 { font-size: 22px; }
        .audio__text p { margin-top: 6px; color: rgba(244,236,218,0.65); font-size: 14px; }
        .audio__controls { display: flex; gap: 10px; }
        .audio__controls button { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--stone-line); background: var(--charcoal-3); color: var(--cream); display: flex; align-items: center; justify-content: center; transition: all .2s ease; }
        .audio__controls button:hover:not(:disabled) { background: var(--gold); color: var(--charcoal); border-color: var(--gold); }
        .audio__controls button:disabled { opacity: 0.35; cursor: not-allowed; }
      `}</style>
    </section>
  );
}
