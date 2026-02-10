import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useStore } from '@nanostores/react';
import { currentMode } from '../store/themeStore';
import * as THREE from 'three';

const COUNT = 3000;
const COLOR_ORBIT = new THREE.Color("#F2F2F2");
const COLOR_ABYSS = new THREE.Color("#00E5FF");

function Particles() {
  const pointsRef = useRef();
  const materialRef = useRef();
  const mode = useStore(currentMode);
  const transitionRef = useRef(0);

  const { positions, initialPositions, speeds, offsets } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const initPos = new Float32Array(COUNT * 3);
    const spds = new Float32Array(COUNT);
    const offs = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const r = 2 * Math.sqrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;

      pos[i3] = r * Math.cos(theta);
      pos[i3 + 1] = (Math.random() - 0.5) * 10;
      pos[i3 + 2] = r * Math.sin(theta);

      initPos[i3] = pos[i3];
      initPos[i3 + 2] = pos[i3 + 2];

      spds[i] = 0.005 + Math.random() * 0.015;
      offs[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, initialPositions: initPos, speeds: spds, offsets: offs };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !materialRef.current) return;

    const targetT = mode === 'abyss' ? 1 : 0;
    transitionRef.current = THREE.MathUtils.lerp(transitionRef.current, targetT, delta * 2.5);
    const t = transitionRef.current;

    materialRef.current.color.lerpColors(COLOR_ORBIT, COLOR_ABYSS, t);
    materialRef.current.size = THREE.MathUtils.lerp(0.005, 0.012, t);
    materialRef.current.opacity = THREE.MathUtils.lerp(0.8, 0.6, t);

    const positionsArray = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.getElapsedTime();

    pointsRef.current.rotation.x += (delta / 10) * (1 - t);
    pointsRef.current.rotation.y += (delta / 15) * (1 - t);
    
    if (t > 0.1) {
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, 0, delta);
    }

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      positionsArray[i3 + 1] += speeds[i] * t * 0.35;

      if (t > 0.01) {
        const oscillation = Math.sin(time * 1.5 + offsets[i]) * 0.1 * t;
        positionsArray[i3] = initialPositions[i3] + oscillation;
        positionsArray[i3 + 2] = initialPositions[i3 + 2] + Math.cos(time * 1.2 + offsets[i]) * 0.1 * t;
      } else {
        positionsArray[i3] = THREE.MathUtils.lerp(positionsArray[i3], initialPositions[i3], delta * 5);
        positionsArray[i3 + 2] = THREE.MathUtils.lerp(positionsArray[i3 + 2], initialPositions[i3 + 2], delta * 5);
      }

      if (positionsArray[i3 + 1] > 5) {
        positionsArray[i3 + 1] = -5;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    if (state.scene.fog) {
      state.scene.fog.color.lerpColors(COLOR_ORBIT, COLOR_ABYSS, t);
      state.scene.fog.density = THREE.MathUtils.lerp(0, 0.15, t);
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        ref={materialRef}
        transparent
        color="#F2F2F2"
        size={0.005}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function StarField() {
  const mode = useStore(currentMode);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      setIsWebGLSupported(false);
      return;
    }

    // Check if WebGL is actually functional
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      
      // Some environments report WebGL support but it's disabled
      if (vendor.includes('Disabled') || renderer.includes('Disabled')) {
        setIsWebGLSupported(false);
        return;
      }
    }
  }, []);

  const handleCanvasError = (error) => {
    console.error('WebGL context creation failed:', error);
    setHasError(true);
  };

  if (!isWebGLSupported || hasError) {
    // Fallback to CSS-only starfield
    return (
      <div 
        className="fixed inset-0 -z-10 h-full w-full transition-colors duration-1000 ease-in-out overflow-hidden"
        style={{ backgroundColor: mode === 'orbit' ? '#050505' : '#00101F' }}
      >
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                opacity: Math.random() * 0.8 + 0.2,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="fixed inset-0 -z-10 h-full w-full transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: mode === 'orbit' ? '#050505' : '#00101F' }}
    >
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.FogExp2('#050505', 0);
        }}
        onError={handleCanvasError}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}