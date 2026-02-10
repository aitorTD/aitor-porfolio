import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { currentMode, initializeMode } from '../store/themeStore';

export default function ResumeButton() {
  const mode = useStore(currentMode);

  useEffect(() => {
    initializeMode();
  }, []);

  const cvPath = mode === 'orbit' ? '/assets/cv-developer.pdf' : '/assets/cv-diver.pdf';

  return (
    <a
      href={cvPath}
      download
      className="px-3 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 cursor-pointer transition-all duration-300 font-mono text-xs tracking-widest flex items-center justify-center"
      title={mode === 'orbit' ? 'Download Developer CV' : 'Download Diver CV'}
    >
      {mode === 'orbit' ? (
        <>
          Download Dev CV
        </>
      ) : (
        <>
          Download Diver CV
        </>
      )}
    </a>
  );
}
