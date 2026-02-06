import React from "react";
import { useStore } from "@nanostores/react";
import { currentMode } from "../store/themeStore";
import FadeTransition from "./FadeTransition";

const email = "aitortd.dev@gmail.com";

export default function FooterContent() {
  const mode = useStore(currentMode);
  return (
    <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
      <span className="font-mono text-sm tracking-widest mb-6 system-ready-text">// END_OF_LINE</span>

      <h2 className="font-display text-5xl md:text-8xl font-bold mb-8 tracking-tighter">
        READY TO <br className="md:hidden" />
        <FadeTransition mode={mode}>
          <span 
            className="footer-hover-span transition-colors duration-300 cursor-default selection:bg-white selection:text-black"
            style={{ color: '#F2F2F2' }}
          >
            {mode === "orbit" ? "LAUNCH?" : "SUBMERGE?"}
          </span>
        </FadeTransition>
      </h2>

      <div className="font-sans text-gray-400 max-w-lg text-lg mb-12">
        <FadeTransition mode={mode}>
          {mode === "orbit"
            ? "Disponible para nuevos proyectos."
            : "Disponible para nuevos proyectos."}
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
            {mode === "orbit" ? "INICIAR TRANSMISIÓN" : "INICIAR INMERSIÓN"}
          </FadeTransition>
        </span>
      </a>
    </div>
  );
}
