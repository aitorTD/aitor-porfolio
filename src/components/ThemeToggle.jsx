import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { currentMode, toggleMode } from '../store/themeStore';
import { Rocket, Anchor } from 'lucide-react'; // Necesitas importar iconos

export default function ThemeToggle() {
  const mode = useStore(currentMode);

  // Efecto para leer localStorage al cargar
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      currentMode.set(savedMode);
      document.documentElement.setAttribute('data-theme', savedMode);
    }
  }, []);

  return (
    <button
      onClick={toggleMode}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:border-accent hover:pointer cursor-pointer transition-all duration-300 group"
      title={mode === 'orbit' ? "Switch to Abyss Mode" : "Switch to Orbit Mode"}
    >
      <div className="relative w-6 h-6">
        {/* Icono Cohete (Orbit) */}
        <Rocket 
          size={24} 
          className={`absolute inset-0 transition-all duration-500 ${
            mode === 'orbit' 
              ? 'opacity-100 rotate-0 text-[#FF5500]' 
              : 'opacity-0 -rotate-90 text-gray-400'
          }`} 
        />
        
        {/* Icono Ancla (Abyss) */}
        <Anchor 
          size={24} 
          className={`absolute inset-0 transition-all duration-500 ${
            mode === 'abyss' 
              ? 'opacity-100 rotate-0 text-[#00E5FF]' 
              : 'opacity-0 rotate-90 text-gray-400'
          }`} 
        />
      </div>
    </button>
  );
}