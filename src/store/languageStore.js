import { atom } from 'nanostores';

export const currentLang = atom('en');

export const setLang = (lang) => {
  if (lang !== 'en' && lang !== 'es') return;

  currentLang.set(lang);

  if (globalThis.window != undefined) {
    localStorage.setItem('lang', lang);
    document.documentElement.dataset.lang = lang;
    document.documentElement.lang = lang;
  }
};

export const toggleLang = () => {
  setLang(currentLang.get() === 'en' ? 'es' : 'en');
};

export const initializeLang = () => {
  if (globalThis.window == undefined) return;

  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');

  if (urlLang === 'en' || urlLang === 'es') {
    setLang(urlLang);
    return;
  }

  const savedLang = localStorage.getItem('lang');
  if (savedLang === 'en' || savedLang === 'es') {
    setLang(savedLang);
    return;
  }

  setLang('en');
};
