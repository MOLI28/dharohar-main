import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [toast, setToast] = useState({ show: false, message: '' });
  const [sourceId, setSourceId] = useState(null);
  const [contributionType, setContributionType] = useState(null);
  const [aiOpen, setAIOpen] = useState(false);
  const [aiPrefill, setAIPrefill] = useState(null);
  const timerRef = useRef(null);

  const showToast = useCallback((message) => {
    clearTimeout(timerRef.current);
    setToast({ show: true, message });
    timerRef.current = setTimeout(() => setToast({ show: false, message: '' }), 3600);
  }, []);

  const openSource = useCallback((id) => setSourceId(id), []);
  const closeSource = useCallback(() => setSourceId(null), []);

  const openContribution = useCallback((type = 'photo') => setContributionType(type), []);
  const closeContribution = useCallback(() => setContributionType(null), []);

  const openAIGuide = useCallback((prefillQuestion) => {
    setAIPrefill(prefillQuestion || null);
    setAIOpen(true);
  }, []);
  const closeAIGuide = useCallback(() => setAIOpen(false), []);

  return (
    <UIContext.Provider
      value={{
        toast, showToast,
        sourceId, openSource, closeSource,
        contributionType, openContribution, closeContribution,
        aiOpen, aiPrefill, openAIGuide, closeAIGuide
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}
