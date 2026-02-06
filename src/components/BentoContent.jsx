import React from "react";
import { useStore } from "@nanostores/react";
import { currentMode } from "../store/themeStore";
import { bentoContent } from "../data/content";
import { Terminal, Cpu, MapPin, Anchor, Briefcase, Award, Clock } from "lucide-react";
import FadeTransition from "./FadeTransition";

export default function BentoContent() {
  const mode = useStore(currentMode);
  const content = bentoContent[mode];

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
            {content.title}
          </h3>
          <p className="text-gray-400 font-sans leading-relaxed mb-6">
            {content.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full font-mono">
              {mode === "orbit" ? "Available for hire" : "Active diver"}
            </span>
            <span className="px-3 py-1 border border-white/20 text-white/60 text-xs rounded-full font-mono">
              {mode === "orbit" ? "5+ years exp" : "200+ dives"}
            </span>
          </div>
        </FadeTransition>
      </div>

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

      <div className={`md:col-span-1 md:row-span-1 ${boxStyle}`}>
        <FadeTransition mode={mode}>
          <h3 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
            <MapPin size={18} className="text-accent" /> Location
          </h3>
          <p className="text-gray-400 text-sm font-sans mb-2">
            {content.location}
          </p>
          <p className="text-gray-500 text-xs font-mono">
            {content.subLocation}
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
            {mode === "orbit" ? "Experience" : "Achievements"}
          </h3>
          <div className="space-y-2">
            {mode === "orbit" ? (
              <>
                <p className="text-gray-400 text-xs font-sans">• 5+ years full-stack</p>
                <p className="text-gray-400 text-xs font-sans">• 50+ projects delivered</p>
                <p className="text-gray-400 text-xs font-sans">• Team lead experience</p>
              </>
            ) : (
              <>
                <p className="text-gray-400 text-xs font-sans">• Divemaster certified</p>
                <p className="text-gray-400 text-xs font-sans">• Deep wreck specialist</p>
                <p className="text-gray-400 text-xs font-sans">• Rescue trained</p>
              </>
            )}
          </div>
        </FadeTransition>
      </div>
    </div>
  );
}
