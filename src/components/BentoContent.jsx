import React from "react";
import { useStore } from "@nanostores/react";
import { currentMode } from "../store/themeStore";
import { currentLang } from "../store/languageStore";
import { bentoContent } from "../data/content";
import { Terminal, Cpu, MapPin, Anchor, Briefcase, Award } from "lucide-react";
import FadeTransition from "./FadeTransition";

export default function BentoContent() {
  const mode = useStore(currentMode);
  const lang = useStore(currentLang);
  const content = bentoContent[mode];

  const t = {
    badgeStatus: {
      orbit: { en: "Available for hire", es: "Disponible" },
      abyss: { en: "Active training", es: "En formación" }
    },
    location: { en: "Location", es: "Ubicación" },
    experience: { en: "Experience", es: "Experiencia" },
    achievements: { en: "Achievements", es: "Logros" },
    bullets: {
      orbit: {
        en: [
          "1+ years full-stack",
          "Team lead experience"
        ],
        es: [
          "1+ año full-stack",
          "Experiencia liderando equipos"
        ]
      },
      abyss: {
        en: [
          "Expert communication in English, essential for international diving environments.",
          "Successfully managed IT infrastructure for 30+ users.",
          "Completed Oceanography (UB) and Nitrox (FEDAS) specialized courses.",
          "Proven 100% precision and safety in defense industry operations at FMG.",
          "Expert at managing complex systems and troubleshooting under pressure."
        ],
        es: [
          "Comunicación avanzada en inglés, clave para entornos de buceo internacionales.",
          "Gestión de infraestructura IT para más de 30 usuarios.",
          "Formación especializada completada en Oceanografía (UB) y Nitrox (FEDAS).",
          "Precisión y seguridad demostradas al 100% en operaciones de industria de defensa (FMG).",
          "Capacidad para gestionar sistemas complejos y resolver incidencias bajo presión."
        ]
      }
    }
  };

  const getField = (value) => {
    if (value && typeof value === 'object') return value[lang] ?? value.en;
    return value;
  };

  const renderTextWithBreaks = (value) => {
    const text = getField(value);
    if (typeof text !== "string") return text;
    if (!text.includes("<br>")) return text;

    const parts = text.split("<br>");
    return parts.map((part, idx) => (
      <React.Fragment key={idx}>
        {part}
        {idx < parts.length - 1 ? <br /> : null}
      </React.Fragment>
    ));
  };

  const boxStyle =
    "border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md p-8 transition-all duration-300 hover:border-accent";

  return (
    <div
      key={mode}
      className="grid grid-cols-1 md:grid-cols-4 gap-4 fade-content"
    >
      <div className={`md:col-span-2 md:row-span-2 ${boxStyle}`}>
        <FadeTransition mode={mode}>
          {mode === "orbit" ? (
            <Terminal className="text-accent mb-4" />
          ) : (
            <Anchor className="text-accent mb-4" />
          )}
          <h3 className="font-display text-2xl font-bold mb-4">
            {getField(content.title)}
          </h3>
          <p className="text-gray-400 font-sans leading-relaxed mb-6">
            {renderTextWithBreaks(content.description)}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full font-mono">
              {t.badgeStatus[mode][lang]}
            </span>
            {/* <span className="px-3 py-1 border border-white/20 text-white/60 text-xs rounded-full font-mono">
              {mode === "orbit" ? "2+ years exp" : "5+ dives"}
            </span> */}
          </div>
        </FadeTransition>
      </div>

      <div className={`md:col-span-1 md:row-span-2 ${boxStyle}`}>
        <FadeTransition mode={mode}>
          <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
            <Cpu size={20} className="text-accent" /> {getField(content.stackTitle)}
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

      <div className={`md:col-span-1 md:row-span-1 ${boxStyle}`}>
        <FadeTransition mode={mode}>
          <h3 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
            <MapPin size={18} className="text-accent" /> {t.location[lang]}
          </h3>
          <p className="text-gray-400 text-sm font-sans mb-2">
            {getField(content.location)}
          </p>
          <p className="text-gray-500 text-xs font-mono">
            {getField(content.subLocation)}
          </p>
        </FadeTransition>
      </div>

      <div className={`md:col-span-1 md:row-span-1 ${boxStyle}`}>
        <FadeTransition mode={mode}>
          <h3 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
            {mode === "orbit" ? (
              <Briefcase size={18} className="text-accent" />
            ) : (
              <Award size={18} className="text-accent" />
            )}
            {mode === "orbit" ? t.experience[lang] : t.achievements[lang]}
          </h3>
          <div className="space-y-2">
            {mode === "orbit" ? (
              <>
                {t.bullets.orbit[lang].map((line) => (
                  <p key={line} className="text-gray-400 text-xs font-sans">• {line}</p>
                ))}
              </>
            ) : (
              <>
                {t.bullets.abyss[lang].map((line) => (
                  <p key={line} className="text-gray-400 text-xs font-sans">• {line}</p>
                ))}
              </>
            )}
          </div>
        </FadeTransition>
      </div>
    </div>
  );
}
