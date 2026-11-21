export const sources = [
  {
    id: 'asi',
    name: 'Archaeological Survey of India',
    type: { en: 'Government archaeological authority', hi: 'सरकारी पुरातात्विक प्राधिकरण' },
    supports: {
      en: 'Structural documentation, historical periods, protected-site status and visiting regulations.',
      hi: 'संरचनात्मक दस्तावेज़ीकरण, ऐतिहासिक काल, संरक्षित-स्थल स्थिति और भ्रमण नियम।'
    },
    confidence: 'high',
    url: 'https://asi.nic.in/'
  },
  {
    id: 'rajasthan-tourism',
    name: 'Rajasthan Tourism',
    type: { en: 'State government tourism department', hi: 'राज्य सरकार पर्यटन विभाग' },
    supports: {
      en: 'Visitor information, site descriptions and continuing cultural practices.',
      hi: 'आगंतुक जानकारी, स्थल विवरण और जारी सांस्कृतिक प्रथाएँ।'
    },
    confidence: 'high',
    url: 'https://www.tourism.rajasthan.gov.in/'
  },
  {
    id: 'incredible-india',
    name: "Incredible India (Government of India)",
    type: { en: 'National tourism portal', hi: 'राष्ट्रीय पर्यटन पोर्टल' },
    supports: {
      en: 'General heritage-site overview and cultural context.',
      hi: 'सामान्य विरासत-स्थल अवलोकन और सांस्कृतिक संदर्भ।'
    },
    confidence: 'high',
    url: 'https://www.incredibleindia.gov.in/'
  },
  {
    id: 'oral-tradition',
    name: 'Local Oral Tradition',
    type: { en: 'Community-transmitted folklore', hi: 'सामुदायिक रूप से प्रसारित लोककथा' },
    supports: {
      en: 'Legends, curses and stories passed through generations near the site.',
      hi: 'स्थल के निकट पीढ़ियों से चली आ रही गाथाएँ, श्राप और कहानियाँ।'
    },
    confidence: 'folklore',
    url: null
  },
  {
    id: 'popular-media',
    name: 'Popular Culture / Media',
    type: { en: 'Tourism marketing, television and internet lore', hi: 'पर्यटन विपणन, टेलीविज़न और इंटरनेट किंवदंती' },
    supports: {
      en: 'Widely circulated but unverified supernatural claims about the site.',
      hi: 'स्थल के बारे में व्यापक रूप से प्रचलित परंतु असत्यापित अलौकिक दावे।'
    },
    confidence: 'unverified',
    url: null
  }
];
