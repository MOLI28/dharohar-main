import { DEMO_HERITAGE } from '../data/demoHeritage.js';

export const suggestedQuestions = [
  { en: 'Why is this heritage important?', hi: 'यह विरासत महत्वपूर्ण क्यों है?' },
  { en: 'Tell me its history.', hi: 'इसका इतिहास बताइए।' },
  { en: 'What is its architectural style?', hi: 'इसकी स्थापत्य शैली क्या है?' },
  { en: 'Tell me a verified fact.', hi: 'एक सत्यापित तथ्य बताइए।' },
  { en: 'What can I explore at this site?', hi: 'मैं इस स्थल पर क्या देख सकता हूँ?' },
  { en: 'Explain this in Hindi.', hi: 'इसे हिंदी में समझाइए।' }
];

export async function askVirasatAI(question, lang='en') {
  const q=question.toLowerCase();
  let record=DEMO_HERITAGE.find(h=>q.includes(h.name.toLowerCase())||q.includes(h.slug.replaceAll('-',' ')));
  if(!record){
    record=DEMO_HERITAGE.find(h=>[h.category,h.state,h.city,h.subcategory].filter(Boolean).some(v=>q.includes(String(v).toLowerCase())));
  }
  if(!record){
    return {text: lang==='hi' ? 'मैं अभी केवल धरोहर के डेमो आर्काइव में उपलब्ध स्रोत-आधारित रिकॉर्ड पर उत्तर दे सकता हूँ। किसी स्मारक, मंदिर, कला, परंपरा, संगीत या नृत्य का नाम पूछें।' : 'I can answer from the source-backed Dharohar demo archive. Ask about a monument, temple, craft, tradition, music or dance form in the prototype.',sources:[]};
  }
  const facts=[record.short_description,record.period&&`Period: ${record.period}.`,record.architectural_style&&`Architectural style: ${record.architectural_style}.`,record.built_year&&`Date/period: ${record.built_year}.`,Array.isArray(record.associated_rulers)&&record.associated_rulers.length?`Associated with: ${record.associated_rulers.join(', ')}.`:'',record.cultural_significance&&`Cultural significance: ${record.cultural_significance}`,Array.isArray(record.interesting_facts)&&record.interesting_facts[0]?`Interesting fact: ${record.interesting_facts[0]}`:''].filter(Boolean);
  const text=lang==='hi'?`${record.name}: ${record.short_description||'इस रिकॉर्ड का संक्षिप्त विवरण उपलब्ध है।'} यह डेमो उत्तर धरोहर के क्यूरेटेड रिकॉर्ड पर आधारित है; अपुष्ट दावों को तथ्य के रूप में प्रस्तुत नहीं किया जाता।`:`${record.name}: ${facts.join(' ')} This demo answer is grounded in the Dharohar curated record; unsupported claims are not presented as facts.`;
  return {text,sources:(record.sources||[]).map(s=>s.name||s)};
}
