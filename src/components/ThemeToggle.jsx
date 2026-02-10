import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { currentMode, toggleMode, initializeMode } from '../store/themeStore';

export default function ThemeToggle() {
  const mode = useStore(currentMode);

  useEffect(() => {
    initializeMode();
  }, []);

  return (
    <div className="mb-8 flex justify-center">
      <div className="inline-flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1">
        <button
          onClick={() => mode !== 'orbit' && toggleMode()}
          className={`px-6 py-2 rounded-full font-mono text-sm font-medium transition-all duration-300 cursor-pointer ${
            mode === 'orbit'
              ? 'bg-[#FF5500] text-white shadow-lg shadow-[#FF5500]/25'
              : 'text-gray-400 opacity-50 hover:opacity-70'
          }`}
        >
          DEV
        </button>
        
        <span className="text-gray-500 font-mono text-xs px-2">/</span>
        
        <button
          onClick={() => mode !== 'abyss' && toggleMode()}
          className={`px-6 py-2 rounded-full font-mono text-sm font-medium transition-all duration-300 cursor-pointer ${
            mode === 'abyss'
              ? 'bg-[#00E5FF] text-white shadow-lg shadow-[#00E5FF]/25'
              : 'text-gray-400 opacity-50 hover:opacity-70'
          }`}
        >
          DIVER
        </button>
      </div>
    </div>
  );
}