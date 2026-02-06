import { atom } from 'nanostores';

export const currentMode = atom('orbit');

export const toggleMode = () => {
  const newMode = currentMode.get() === 'orbit' ? 'abyss' : 'orbit';
  currentMode.set(newMode);
  
  if (globalThis.window != undefined) {
    localStorage.setItem('themeMode', newMode);
    document.documentElement.dataset.theme = newMode;
  }
};

export const setMode = (mode) => {
  currentMode.set(mode);
  
  if (globalThis.window != undefined) {
    localStorage.setItem('themeMode', mode);
    document.documentElement.dataset.theme = mode;
  }
};

export const initializeMode = () => {
  if (globalThis.window != undefined) {
    // Check URL parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const urlMode = urlParams.get('theme');
    
    if (urlMode === 'orbit' || urlMode === 'abyss') {
      setMode(urlMode);
      return;
    }
    
    // Fall back to localStorage
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode === 'orbit' || savedMode === 'abyss') {
      setMode(savedMode);
    }
  }
};