import React from "react";
import { useStore } from "@nanostores/react";
import { currentMode } from "../store/themeStore";

const email = "aitortd.dev@gmail.com"; 

export default function FooterContent() {
  const mode = useStore(currentMode);
  return (
    <div class="max-w-6xl mx-auto flex flex-col items-center text-center">
      <span class="font-mono text-[#F2F2F2] text-sm tracking-widest mb-6">
        // END_OF_LINE
      </span>

      <h2 class="font-display text-5xl md:text-8xl font-bold mb-8 tracking-tighter">
        READY TO <br class="md:hidden" />
        <span class="text-bone-white transition-colors duration-500 cursor-default selection:bg-white selection:text-black group-hover/footer:text-accent">
          {mode === 'orbit' ? 'LAUNCH?' : 'SUBMERGE?'}
        </span>
      </h2>

      <p class="font-sans text-gray-400 max-w-lg text-lg mb-12">
        Actualmente disponible para nuevos proyectos. Si buscas ingeniería de
        precisión, hablemos.
      </p>

      <a
        href={`mailto:${email}`}
        class="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-display font-bold text-xl tracking-wide overflow-hidden hover:text-white transition-colors duration-300"
      >
        <span class="absolute inset-0 bg-[#FF5500] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>

        <span class="relative z-10 flex items-center gap-2">
          {mode === 'orbit' ? 'INICIAR TRANSMISIÓN' : 'INICIAR INMERSIÓN'}
        </span>
      </a>
    </div>
  );
}
