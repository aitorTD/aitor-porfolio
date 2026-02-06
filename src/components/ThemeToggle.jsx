import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { currentMode, toggleMode, initializeMode } from '../store/themeStore';
import { Rocket, Anchor } from 'lucide-react';

export default function ThemeToggle() {
  const mode = useStore(currentMode);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    initializeMode();
  }, []);

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={toggleMode}
        onMouseEnter={() => setShowHint(true)}
        onMouseLeave={() => setShowHint(false)}
        className="relative p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:border-accent cursor-pointer transition-all duration-300 group"
        title={mode === 'orbit' ? "Switch to Abyss Mode" : "Switch to Orbit Mode"}
      >
        <div className="relative w-6 h-6">
          <Rocket 
            size={24} 
            className={`absolute inset-0 transition-all duration-300 ${
              mode === 'orbit' 
                ? 'opacity-100 rotate-0 text-[#FF5500]' 
                : 'opacity-0 -rotate-90 text-gray-400'
            }`} 
          />
          
          <Anchor 
            size={24} 
            className={`absolute inset-0 transition-all duration-300 ${
              mode === 'abyss' 
                ? 'opacity-100 rotate-0 text-[#00E5FF]' 
                : 'opacity-0 rotate-90 text-gray-400'
            }`} 
          />
        </div>
      </button>

      {/* Subtle hint tooltip */}
      <div 
        className={`absolute top-full right-0 mt-2 px-3 py-2 bg-black/90 backdrop-blur-sm border border-white/10 rounded-lg text-xs font-mono transition-all duration-300 pointer-events-none ${
          showHint ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <div className="text-accent mb-1">
          {mode === 'orbit' ? 'Developer Profile' : 'Diver Profile'}
        </div>
        <div className="text-gray-400 whitespace-nowrap">
          {mode === 'orbit' ? 'Click to explore diving' : 'Click to explore development'}
        </div>
        {/* Small arrow */}
        <div className="absolute -top-1 right-4 w-2 h-2 bg-black/90 border-l border-t border-white/10 transform rotate-45"></div>
      </div>
    </div>
  );
}