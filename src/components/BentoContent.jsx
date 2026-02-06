import React from "react";
import { useStore } from "@nanostores/react";
import { currentMode } from "../store/themeStore";
import { bentoContent } from "../data/content";
import { Terminal, Cpu, MapPin, Anchor } from "lucide-react";
import FadeTransition from "./FadeTransition";

export default function BentoContent() {
  const mode = useStore(currentMode);
  const content = bentoContent[mode];

  const boxStyle =
    "border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md p-8 transition-all duration-700 hover:border-accent";

  return (
    /* La key aquí en el contenedor padre reinicia la animación de todos los hijos */
    <div
      key={mode}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 fade-content"
    >
      {/* BIO */}
      <div className={`md:col-span-2 md:row-span-2 ${boxStyle}`}>
        <FadeTransition mode={mode}>
          {mode === "orbit" ? (
            <Terminal className="text-accent mb-4" />
          ) : (
            <Anchor className="text-accent mb-4" />
          )}
          <h3 className="font-display text-2xl font-bold mb-4">
            {content.title}
          </h3>
          <p className="text-gray-400 font-sans leading-relaxed">
            {content.description}
          </p>
        </FadeTransition>
      </div>

      {/* STACK */}
      <div className={`md:col-span-1 md:row-span-2 ${boxStyle}`}>
        <FadeTransition mode={mode}>
          <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
            <Cpu size={20} className="text-accent" /> {content.stackTitle}
          </h3>
          <div className="flex flex-wrap gap-2">
            {content.stack.map((item) => (
              <span
                key={item}
                className="px-2 py-1 border border-white/5 bg-white/5 text-xs text-gray-300 rounded"
              >
                {item}
              </span>
            ))}
          </div>
        </FadeTransition>
      </div>

      {/* UBICACIÓN */}
      <div
        className={`md:col-span-1 ${boxStyle} flex flex-col items-center justify-center`}
      >
        <FadeTransition mode={mode}>
          <MapPin className="text-accent mb-2" />
          <h3 className="font-display text-xl font-bold">{content.location}</h3>
          <p className="text-xs text-gray-500 font-mono mt-1">
            {content.subLocation}
          </p>
        </FadeTransition>
      </div>
    </div>
  );
}
