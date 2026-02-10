import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { currentLang, toggleLang, initializeLang } from '../store/languageStore';

export default function LanguageToggle() {
  const lang = useStore(currentLang);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    initializeLang();
  }, []);

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      toggleLang();
      setIsAnimating(false);
    }, 150);
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-6 right-6 z-50 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:border-accent cursor-pointer transition-all duration-300 font-mono text-xs tracking-widest flex items-center justify-center"
      title={lang === 'en' ? 'Switch to Spanish' : 'Switch to English'}
    >
      <span className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
        {lang === 'en' ? 'English' : 'Spanish'}
      </span>
    </button>
  );
}
