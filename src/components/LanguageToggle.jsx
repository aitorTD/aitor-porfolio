import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { currentLang, toggleLang, initializeLang } from '../store/languageStore';

export default function LanguageToggle() {
  const lang = useStore(currentLang);

  useEffect(() => {
    initializeLang();
  }, []);

  return (
    <button
      onClick={toggleLang}
      className="fixed top-6 right-20 z-50 p-3 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:border-accent cursor-pointer transition-all duration-300 font-mono text-xs tracking-widest flex items-center justify-center"
      title={lang === 'en' ? 'Switch to Spanish' : 'Switch to English'}
    >
      {lang === 'en' ? 'EN' : 'ES'}
    </button>
  );
}
