import React from 'react';
import { useStore } from '@nanostores/react';
import { currentMode } from '../store/themeStore';

export default function HeroContent() {
  const mode = useStore(currentMode);

  return (
    <div className="text-center transition-all duration-700 ease-in-out">
      {/* Subtítulo dinámico */}
      <p className="font-sans text-accent tracking-widest text-sm mb-4 uppercase font-semibold transition-colors duration-500">
        {mode === 'orbit' ? 'Software Developer' : 'Technical Diver'}
      </p>
      
      {/* Título Principal dinámico */}
      <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight text-bone-white">
        AITOR <span className="text-dim-gray">/</span> {mode === 'orbit' ? 'DEV' : 'DIVER'}
      </h1>
      
      {/* Descripción dinámica */}
      <p className="font-sans text-lg text-gray-400 max-w-lg mx-auto mb-8 transition-opacity duration-500">
        {mode === 'orbit' 
          ? 'Construyendo sistemas escalables en el vacío digital. Minimalismo y precisión.' 
          : 'Explorando entornos hostiles bajo presión. Disciplina técnica y control.'}
      </p>

      {/* Botones (Asegúrate de que las clases coinciden con tus variables CSS) */}
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <a href="#projects" className="bg-white text-black px-8 py-3 font-display font-bold hover-bg-accent hover:text-white transition-colors duration-300">
          {mode === 'orbit' ? 'VER PROYECTOS' : 'BITÁCORA DE BUCEO'}
        </a>
        <a href="#contact" className="border border-white/20 text-white px-8 py-3 font-display font-bold hover:border-white transition-colors duration-300">
          CONTACTO
        </a>
      </div>
    </div>
  );
}