import { atom } from 'nanostores';

// El estado inicial es 'orbit' (Espacio)
export const currentMode = atom('orbit');

// Función helper para cambiar el modo
export const toggleMode = () => {
  const newMode = currentMode.get() === 'orbit' ? 'abyss' : 'orbit';
  currentMode.set(newMode);
  
  // Guardamos en localStorage para recordar la preferencia
  if (typeof window !== 'undefined') {
    localStorage.setItem('themeMode', newMode);
    // Cambiamos el atributo data-theme en el HTML para CSS
    document.documentElement.setAttribute('data-theme', newMode);
  }
};