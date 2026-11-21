import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { UIProvider, useUI } from './context/UIContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Bhangarh from './pages/Bhangarh.jsx';
import SearchResults from './pages/SearchResults.jsx';
import HeritageDetail from './pages/HeritageDetail.jsx';
import Explore from './pages/Explore.jsx';
import AIGuide from './components/AIGuide.jsx';
import SourceDrawer from './components/SourceDrawer.jsx';
import { CheckCircle2 } from 'lucide-react';

function Toast() {
  const { toast } = useUI();
  return (
    <div className={`toast ${toast.show ? 'show' : ''}`} role="status" aria-live="polite">
      <CheckCircle2 size={20} color="var(--gold)" />
      <span>{toast.message}</span>
    </div>
  );
}

function Shell() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bhangarh" element={<Bhangarh />} />
        <Route path="/heritage/:id" element={<HeritageDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
      <Footer />
      <AIGuide />
      <SourceDrawer />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <UIProvider>
        <Shell />
      </UIProvider>
    </LanguageProvider>
  );
}
