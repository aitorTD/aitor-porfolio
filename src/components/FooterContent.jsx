import React from "react";
import { useStore } from "@nanostores/react";
import { currentMode } from "../store/themeStore";
import { currentLang } from "../store/languageStore";
import FadeTransition from "./FadeTransition";

const email = "aitortd.dev@gmail.com";

export default function FooterContent() {
  const mode = useStore(currentMode);
  const lang = useStore(currentLang);

  const copy = {
    heading: { en: 'READY TO', es: 'LISTO PARA' },
    prompt: {
      orbit: { en: 'LAUNCH?', es: 'DESPEGAR?' },
      abyss: { en: 'SUBMERGE?', es: 'SUMERGIRTE?' }
    },
    availability: {
      en: 'Available for new projects.',
      es: 'Disponible para nuevos proyectos.'
    },
    cta: {
      orbit: { en: 'START TRANSMISSION', es: 'INICIAR TRANSMISIÓN' },
      abyss: { en: 'START DIVE', es: 'INICIAR INMERSIÓN' }
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
      <span className="font-mono text-sm tracking-widest mb-6 system-ready-text">// END_OF_LINE</span>

      <h2 className="font-display text-5xl md:text-8xl font-bold mb-8 tracking-tighter">
        {copy.heading[lang]} <br className="md:hidden" />
        <FadeTransition mode={mode}>
          <span 
            className="footer-hover-span transition-colors duration-300 cursor-default selection:bg-white selection:text-black"
            style={{ color: '#F2F2F2' }}
          >
            {copy.prompt[mode][lang]}
          </span>
        </FadeTransition>
      </h2>

      <div className="font-sans text-gray-400 max-w-lg text-lg mb-12">
        <FadeTransition mode={mode}>
          {copy.availability[lang]}
        </FadeTransition>
      </div>

      <a
        href={`mailto:${email}`}
        className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-display font-bold text-xl tracking-wide overflow-hidden hover:text-white transition-colors duration-200"
      >
        <span 
          className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out"
          style={{ backgroundColor: mode === 'orbit' ? '#FF5500' : '#00E5FF' }}
        />

        <span className="relative z-10 flex items-center gap-2">
          <FadeTransition mode={mode}>
            {copy.cta[mode][lang]}
          </FadeTransition>
        </span>
      </a>
    </div>
  );
}
