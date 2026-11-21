// Core content for Bhangarh Fort. Bilingual fields use { en, hi } shape so
// the UI can switch languages without re-fetching. Sourced conceptually from
// ASI, Rajasthan Tourism and the Incredible India portal — see sources.js.

export const bhangarhSite = {
  id: 'bhangarh',
  name: 'Bhangarh Fort',
  nameHi: 'भानगढ़ किला',
  location: 'Rajasthan, India',
  locationHi: 'राजस्थान, भारत',
  coords: [27.0946, 76.2807],
  tags: ['Historic Site', 'Rajput Heritage', 'Architecture', 'Folklore'],
  tagsHi: ['ऐतिहासिक स्थल', 'राजपूत विरासत', 'स्थापत्य', 'लोककथा'],
  heroSubtitle: {
    en: 'Where history, architecture and folklore meet.',
    hi: 'जहाँ इतिहास, स्थापत्य कला और लोककथाएँ मिलती हैं।'
  },
  heroImage: 'https://images.unsplash.com/photo-1585506942812-c5b48a1d3e56?q=80&w=1800&auto=format&fit=crop',
  heroImageFallback:
    'linear-gradient(160deg, #3a2c1d 0%, #1b1510 70%)'
};

export const quickFacts = [
  {
    label: { en: 'Location', hi: 'स्थान' },
    value: { en: 'Bhangarh, Rajasthan', hi: 'भानगढ़, राजस्थान' }
  },
  {
    label: { en: 'Historical Period', hi: 'ऐतिहासिक काल' },
    value: { en: '16th–17th century', hi: '16वीं–17वीं शताब्दी' }
  },
  {
    label: { en: 'Heritage Type', hi: 'विरासत प्रकार' },
    value: { en: 'Historic fortified settlement', hi: 'ऐतिहासिक सुरक्षा-प्राचीर युक्त बस्ती' }
  },
  {
    label: { en: 'Landscape', hi: 'भूदृश्य' },
    value: { en: 'Aravalli region', hi: 'अरावली क्षेत्र' }
  },
  {
    label: { en: 'Known For', hi: 'प्रसिद्धि' },
    value: {
      en: 'Temples, palace ruins, gates and markets',
      hi: 'मंदिर, महल के खंडहर, द्वार और बाज़ार'
    }
  }
];

export const aboutSection = {
  heading: { en: 'More Than a Haunted Fort', hi: 'एक भूतिया किले से कहीं अधिक' },
  paragraphs: [
    {
      en: 'Bhangarh is, first and foremost, a historic fortified settlement and cultural landscape in the Aravalli hills of Rajasthan. Its layout reflects careful settlement planning: a fortified perimeter, a central bazaar street, temples aligned along ceremonial axes, and residential quarters radiating toward the royal palace.',
      hi: 'भानगढ़ मूल रूप से राजस्थान की अरावली पहाड़ियों में स्थित एक ऐतिहासिक सुरक्षा-प्राचीर युक्त बस्ती और सांस्कृतिक भूदृश्य है। इसकी संरचना सुनियोजित बसावट को दर्शाती है — एक सुरक्षा-घेरा, केंद्रीय बाज़ार गली, धार्मिक अक्षों पर संरेखित मंदिर, और राजमहल की ओर फैलते आवासीय क्षेत्र।'
    },
    {
      en: 'Surviving temples such as Gopinath, Someshwar, Keshav Rai and Mangla Devi show sustained architectural investment across the site\'s active period, while havelis and market structures point to a functioning local economy.',
      hi: 'गोपीनाथ, सोमेश्वर, केशव राय और मंगला देवी जैसे शेष मंदिर इस स्थल के सक्रिय काल में निरंतर स्थापत्य निवेश दर्शाते हैं, जबकि हवेलियाँ और बाज़ार संरचनाएँ एक कार्यशील स्थानीय अर्थव्यवस्था की ओर संकेत करती हैं।'
    },
    {
      en: 'Alongside this documented history, Bhangarh also carries a rich layer of local tradition and oral storytelling — legends of a curse, a princess and a mystic that have travelled through generations. Virasat AI preserves both layers, but keeps them clearly labelled: documented history is never presented as folklore, and folklore is never presented as documented history.',
      hi: 'इस प्रलेखित इतिहास के साथ-साथ, भानगढ़ में स्थानीय परंपरा और मौखिक कथा-कथन की एक समृद्ध परत भी है — एक श्राप, एक राजकुमारी और एक साधु की गाथाएँ जो पीढ़ियों से चली आ रही हैं। विरासत एआई इन दोनों परतों को सहेजता है, परंतु उन्हें स्पष्ट रूप से अलग रखता है: प्रलेखित इतिहास को कभी लोककथा के रूप में प्रस्तुत नहीं किया जाता, और लोककथा को कभी प्रलेखित इतिहास के रूप में नहीं।'
    }
  ]
};

export const timeline = [
  {
    id: 't1',
    period: { en: 'Late 16th Century', hi: 'देर 16वीं शताब्दी' },
    title: { en: 'Foundation', hi: 'स्थापना' },
    description: {
      en: 'Foundation associated with Raja Bhagwan Das according to ASI documentation.',
      hi: 'ASI के दस्तावेज़ों के अनुसार स्थापना राजा भगवान दास से जुड़ी है।'
    }
  },
  {
    id: 't2',
    period: { en: "Madho Singh's Period", hi: 'माधो सिंह का काल' },
    title: { en: 'Expansion', hi: 'विस्तार' },
    description: {
      en: 'The settlement became associated with Madho Singh, who expanded its structures.',
      hi: 'यह बस्ती माधो सिंह से जुड़ी, जिन्होंने इसकी संरचनाओं का विस्तार किया।'
    }
  },
  {
    id: 't3',
    period: { en: '17th Century', hi: '17वीं शताब्दी' },
    title: { en: 'Growth', hi: 'विकास' },
    description: {
      en: 'Development of temples, markets, residences and royal structures.',
      hi: 'मंदिरों, बाज़ारों, आवासों और राजसी संरचनाओं का विकास।'
    }
  },
  {
    id: 't4',
    period: { en: 'Later Period', hi: 'परवर्ती काल' },
    title: { en: 'Decline', hi: 'पतन' },
    description: {
      en: 'The settlement declined; historians debate the precise causes.',
      hi: 'बस्ती का पतन हुआ; इतिहासकार सटीक कारणों पर बहस करते हैं।'
    }
  },
  {
    id: 't5',
    period: { en: 'Today', hi: 'आज' },
    title: { en: 'Heritage Site', hi: 'विरासत स्थल' },
    description: {
      en: 'Bhangarh survives as a major heritage and tourism site, surrounded by historical records and folklore.',
      hi: 'भानगढ़ एक प्रमुख विरासत और पर्यटन स्थल के रूप में जीवित है, जो ऐतिहासिक अभिलेखों और लोककथाओं से घिरा है।'
    }
  }
];
