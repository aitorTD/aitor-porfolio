import React from 'react';
import { useStore } from '@nanostores/react';
import { currentMode } from '../store/themeStore';
import { currentLang } from '../store/languageStore';
import FadeTransition from './FadeTransition';

export default function HeroContent() {
  const mode = useStore(currentMode);
  const lang = useStore(currentLang);

  const copy = {
    subtitle: {
      orbit: { en: 'Software Developer', es: 'Software Developer' },
      abyss: { en: '(Almost) Technical Diver', es: '(Casi) Buceador Técnico' }
    },
    description: {
      orbit: {
        en: 'Building scalable systems in the digital void. Minimalism and precision.',
        es: 'Construyendo sistemas escalables en el vacío digital. Minimalismo y precisión.'
      },
      abyss: {
        en: 'Exploring hostile environments under pressure. Technical discipline and control.',
        es: 'Explorando entornos hostiles bajo presión. Disciplina técnica y control.'
      }
    },
    primaryCta: {
      orbit: { en: 'VIEW WORK', es: 'VER PROYECTOS' },
      abyss: { en: 'DIVE LOG', es: 'BITÁCORA DE BUCEO' }
    },
    secondaryCta: { en: 'CONTACT', es: 'CONTACTO' }
  };

  return (
    <FadeTransition mode={mode}>
      <div className="text-center transition-all duration-300 ease-in-out">
        <p className="font-sans text-accent tracking-widest text-sm mb-4 uppercase font-semibold transition-colors duration-300">
          {copy.subtitle[mode][lang]}
        </p>
        
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight text-bone-white">
          AITOR <span className="text-dim-gray">/</span> {mode === 'orbit' ? 'DEV' : 'DIVER'}
        </h1>
        
        <p className="font-sans text-lg text-gray-400 max-w-lg mx-auto mb-8 transition-opacity duration-300">
          {copy.description[mode][lang]}
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a href="#projects" className="bg-white text-black px-8 py-3 font-display font-bold hover-bg-accent hover:text-white transition-colors duration-300">
            {copy.primaryCta[mode][lang]}
          </a>
          <a href="#contact" className="border border-white/20 text-white px-8 py-3 font-display font-bold hover:border-white transition-colors duration-300">
            {copy.secondaryCta[lang]}
          </a>
        </div>
      </div>
    </FadeTransition>
  );
}