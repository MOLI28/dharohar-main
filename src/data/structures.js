// Structures for the interactive Architecture Explorer and Leaflet map.
// x/y are percentage positions on the illustrated layout (0-100).

export const structures = [
  {
    id: 'main-gate',
    name: { en: 'Main Gate', hi: 'मुख्य द्वार' },
    type: { en: 'Fortification', hi: 'सुरक्षा-प्राचीर' },
    x: 50, y: 92,
    coords: [27.0910, 76.2807],
    description: {
      en: 'The principal entrance to the fortified settlement, built to control access along the main approach road.',
      hi: 'सुरक्षा-प्राचीर युक्त बस्ती का प्रमुख प्रवेश द्वार, मुख्य पहुँच मार्ग पर नियंत्रण हेतु निर्मित।'
    },
    significance: {
      en: 'Marks the formal entry axis that leads directly toward the bazaar and temple line.',
      hi: 'यह औपचारिक प्रवेश अक्ष को चिन्हित करता है जो सीधे बाज़ार और मंदिर पंक्ति की ओर ले जाता है।'
    },
    evidence: 'verified',
    source: 'ASI'
  },
  {
    id: 'lahori-gate',
    name: { en: 'Lahori Gate', hi: 'लाहौरी दरवाज़ा' },
    type: { en: 'Gate', hi: 'द्वार' },
    x: 20, y: 78,
    coords: [27.0932, 76.2782],
    description: {
      en: 'One of the five historic gates documented at Bhangarh, named for its orientation toward Lahore.',
      hi: 'भानगढ़ में दर्ज पाँच ऐतिहासिक द्वारों में से एक, जिसका नाम लाहौर की दिशा के कारण पड़ा।'
    },
    significance: {
      en: 'Illustrates the settlement\'s planned, multi-gated fortification system.',
      hi: 'बस्ती की सुनियोजित, बहु-द्वार सुरक्षा प्रणाली को दर्शाता है।'
    },
    evidence: 'verified',
    source: 'ASI'
  },
  {
    id: 'ajmeri-gate',
    name: { en: 'Ajmeri Gate', hi: 'अजमेरी दरवाज़ा' },
    type: { en: 'Gate', hi: 'द्वार' },
    x: 80, y: 78,
    coords: [27.0932, 76.2833],
    description: {
      en: 'A secondary gate oriented toward Ajmer, part of the settlement\'s defensive perimeter.',
      hi: 'अजमेर की दिशा में स्थित एक द्वितीयक द्वार, बस्ती की सुरक्षा-परिधि का भाग।'
    },
    significance: {
      en: 'Confirms the multi-directional trade and travel links the settlement maintained.',
      hi: 'बस्ती के बहुदिशीय व्यापार और यात्रा संबंधों की पुष्टि करता है।'
    },
    evidence: 'verified',
    source: 'ASI'
  },
  {
    id: 'phulbari-gate',
    name: { en: 'Phulbari Gate', hi: 'फूलबाड़ी दरवाज़ा' },
    type: { en: 'Gate', hi: 'द्वार' },
    x: 32, y: 60,
    coords: [27.0956, 76.2790],
    description: {
      en: 'A gate documented near the garden precincts on the northern side of the settlement.',
      hi: 'बस्ती के उत्तरी भाग में उद्यान क्षेत्रों के निकट दर्ज एक द्वार।'
    },
    significance: {
      en: 'Evidence of designed garden spaces integrated into settlement planning.',
      hi: 'बस्ती नियोजन में समाहित सुनियोजित उद्यान स्थलों का प्रमाण।'
    },
    evidence: 'verified',
    source: 'ASI'
  },
  {
    id: 'delhi-gate',
    name: { en: 'Delhi Gate', hi: 'दिल्ली दरवाज़ा' },
    type: { en: 'Gate', hi: 'द्वार' },
    x: 68, y: 60,
    coords: [27.0956, 76.2825],
    description: {
      en: 'A gate oriented toward Delhi, one of the documented access points into the fort complex.',
      hi: 'दिल्ली की दिशा में स्थित द्वार, किला परिसर में प्रवेश के दर्ज बिंदुओं में से एक।'
    },
    significance: {
      en: 'Part of the defensive network connecting Bhangarh to regional routes.',
      hi: 'भानगढ़ को क्षेत्रीय मार्गों से जोड़ने वाले सुरक्षा नेटवर्क का भाग।'
    },
    evidence: 'verified',
    source: 'ASI'
  },
  {
    id: 'gopinath-temple',
    name: { en: 'Gopinath Temple', hi: 'गोपीनाथ मंदिर' },
    type: { en: 'Temple', hi: 'मंदिर' },
    x: 50, y: 68,
    coords: [27.0945, 76.2808],
    description: {
      en: 'A well-preserved temple along the central axis, notable for its carved pillars and sanctum.',
      hi: 'केंद्रीय अक्ष पर स्थित एक सुरक्षित मंदिर, अपने नक्काशीदार स्तंभों और गर्भगृह के लिए उल्लेखनीय।'
    },
    significance: {
      en: 'One of the best-preserved examples of temple architecture at the site.',
      hi: 'स्थल पर मंदिर स्थापत्य के सर्वाधिक सुरक्षित उदाहरणों में से एक।'
    },
    evidence: 'verified',
    source: 'ASI'
  },
  {
    id: 'someshwar-temple',
    name: { en: 'Someshwar Temple', hi: 'सोमेश्वर मंदिर' },
    type: { en: 'Temple', hi: 'मंदिर' },
    x: 50, y: 30,
    coords: [27.0975, 76.2808],
    description: {
      en: 'A Shiva temple positioned at the far end of the settlement, marking the ceremonial terminus of the site.',
      hi: 'बस्ती के छोर पर स्थित एक शिव मंदिर, जो स्थल के धार्मिक अंतिम बिंदु को चिन्हित करता है।'
    },
    significance: {
      en: 'Anchors the north–south ceremonial axis of the settlement.',
      hi: 'बस्ती के उत्तर-दक्षिण धार्मिक अक्ष को सुदृढ़ करता है।'
    },
    evidence: 'verified',
    source: 'ASI'
  },
  {
    id: 'keshav-rai-temple',
    name: { en: 'Keshav Rai Temple', hi: 'केशव राय मंदिर' },
    type: { en: 'Temple', hi: 'मंदिर' },
    x: 38, y: 45,
    coords: [27.0962, 76.2798],
    description: {
      en: 'A temple dedicated to Keshav Rai, reflecting Vaishnav worship traditions at Bhangarh.',
      hi: 'केशव राय को समर्पित मंदिर, जो भानगढ़ में वैष्णव पूजा परंपराओं को दर्शाता है।'
    },
    significance: {
      en: 'Evidence of religious plurality within the settlement.',
      hi: 'बस्ती के भीतर धार्मिक विविधता का प्रमाण।'
    },
    evidence: 'verified',
    source: 'ASI'
  },
  {
    id: 'mangla-devi-temple',
    name: { en: 'Mangla Devi Temple', hi: 'मंगला देवी मंदिर' },
    type: { en: 'Temple', hi: 'मंदिर' },
    x: 62, y: 45,
    coords: [27.0962, 76.2818],
    description: {
      en: 'A temple associated with the local deity Mangla Devi, still visited by devotees.',
      hi: 'स्थानीय देवी मंगला देवी से संबंधित मंदिर, जहाँ आज भी श्रद्धालु आते हैं।'
    },
    significance: {
      en: 'Shows continuity of local devotional practice tied to the site.',
      hi: 'स्थल से जुड़ी स्थानीय भक्ति परंपरा की निरंतरता को दर्शाता है।'
    },
    evidence: 'verified',
    source: 'ASI'
  },
  {
    id: 'royal-palace',
    name: { en: 'Royal Palace', hi: 'राजमहल' },
    type: { en: 'Palace', hi: 'महल' },
    x: 50, y: 12,
    coords: [27.1000, 76.2808],
    description: {
      en: 'Ruins of the royal palace occupy the highest point of the settlement, overlooking the bazaar and temple line.',
      hi: 'राजमहल के खंडहर बस्ती के सबसे ऊँचे स्थान पर स्थित हैं, जो बाज़ार और मंदिर पंक्ति को देखते हैं।'
    },
    significance: {
      en: 'Demonstrates classic hill-fort planning with the palace commanding the settlement below.',
      hi: 'शास्त्रीय पहाड़ी-किला नियोजन को प्रदर्शित करता है जिसमें महल नीचे की बस्ती पर नियंत्रण रखता है।'
    },
    evidence: 'verified',
    source: 'ASI'
  },
  {
    id: 'market-area',
    name: { en: 'Market Area', hi: 'बाज़ार क्षेत्र' },
    type: { en: 'Bazaar', hi: 'बाज़ार' },
    x: 50, y: 50,
    coords: [27.0958, 76.2808],
    description: {
      en: 'A long central street lined with shop fronts, connecting the main gate to the temple precinct.',
      hi: 'दुकानों की कतार से सुसज्जित एक लंबी केंद्रीय गली, जो मुख्य द्वार को मंदिर क्षेत्र से जोड़ती है।'
    },
    significance: {
      en: 'Evidence of a functioning local economy and planned commercial space.',
      hi: 'एक कार्यशील स्थानीय अर्थव्यवस्था और सुनियोजित व्यावसायिक स्थल का प्रमाण।'
    },
    evidence: 'verified',
    source: 'ASI'
  }
];
