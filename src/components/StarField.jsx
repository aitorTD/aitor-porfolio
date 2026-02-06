import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useStore } from '@nanostores/react';
import { currentMode } from '../store/themeStore';
import * as THREE from 'three';

// Cantidad de partículas
const COUNT = 3000;

// Definición de colores fuera del loop para optimizar memoria
const COLOR_ORBIT = new THREE.Color("#F2F2F2"); // Blanco Hueso
const COLOR_ABYSS = new THREE.Color("#00E5FF"); // Cian Neón

function Particles() {
  const pointsRef = useRef();
  const materialRef = useRef();
  const mode = useStore(currentMode);
  
  // Referencia mutable para el factor de transición (0 = Orbit, 1 = Abyss)
  const transitionRef = useRef(0);

  // --- INICIALIZACIÓN DE DATOS (Igual que antes) ---
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

  // --- MOTOR DE ANIMACIÓN HÍBRIDO ---
  useFrame((state, delta) => {
    if (!pointsRef.current || !materialRef.current) return;

    // 1. CALCULAR FACTOR DE TRANSICIÓN SUAVE (Lerp de 't')
    const targetT = mode === 'abyss' ? 1 : 0;
    // La velocidad 2.5 define qué tan rápido ocurre la metamorfosis (más bajo = más lento)
    transitionRef.current = THREE.MathUtils.lerp(transitionRef.current, targetT, delta * 2.5);
    
    const t = transitionRef.current; // Valor actual entre 0 y 1

    // 2. INTERPOLAR APARIENCIA (Color, Tamaño, Opacidad)
    // Mezclamos el color en tiempo real
    materialRef.current.color.lerpColors(COLOR_ORBIT, COLOR_ABYSS, t);
    
    // Tamaño: de 0.005 (estrellas) a 0.012 (burbujas)
    materialRef.current.size = THREE.MathUtils.lerp(0.005, 0.012, t);
    
    // Opacidad: de 0.8 a 0.6
    materialRef.current.opacity = THREE.MathUtils.lerp(0.8, 0.6, t);

    // 3. INTERPOLAR MOVIMIENTO (FÍSICA)
    const positionsArray = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.getElapsedTime();

    // A) Rotación del Grupo (Solo ocurre en modo Orbit, así que multiplicamos por 1-t)
    // Cuando t es 1 (Abyss), la rotación se detiene suavemente.
    pointsRef.current.rotation.x += (delta / 10) * (1 - t);
    pointsRef.current.rotation.y += (delta / 15) * (1 - t);
    
    // Si entramos en modo abyss, reseteamos suavemente la rotación X para alinear las burbujas verticalmente
    if (t > 0.1) {
        pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, 0, delta);
    }

    // B) Movimiento de Partículas (Solo ocurre en modo Abyss, multiplicamos por t)
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;

      // Subida vertical: Las estrellas están quietas (speed * 0), las burbujas suben (speed * 1)
      // Multiplicamos la velocidad por 't' para que empiecen a acelerar gradualmente
      positionsArray[i3 + 1] += speeds[i] * t;

      // Oscilación lateral: Solo ocurre si t > 0
      if (t > 0.01) {
          const oscillation = Math.sin(time * 1.5 + offsets[i]) * 0.1 * t; // La oscilación crece con t
          positionsArray[i3] = initialPositions[i3] + oscillation;
          positionsArray[i3 + 2] = initialPositions[i3 + 2] + Math.cos(time * 1.2 + offsets[i]) * 0.1 * t;
      } else {
          // En modo 100% órbita, volvemos a la posición estricta original para evitar "drift"
          positionsArray[i3] = THREE.MathUtils.lerp(positionsArray[i3], initialPositions[i3], delta * 5);
          positionsArray[i3 + 2] = THREE.MathUtils.lerp(positionsArray[i3 + 2], initialPositions[i3 + 2], delta * 5);
      }

      // Loop infinito (Teletransporte suave)
      if (positionsArray[i3 + 1] > 5) {
        positionsArray[i3 + 1] = -5;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // 4. TRANSICIÓN DE NIEBLA (FOG)
    // Accedemos a la niebla de la escena y la modificamos
    if (state.scene.fog) {
        state.scene.fog.color.lerpColors(COLOR_ORBIT, COLOR_ABYSS, t);
        // Densidad: 0.0 (Espacio limpio) -> 0.15 (Agua turbia)
        state.scene.fog.density = THREE.MathUtils.lerp(0, 0.15, t);
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        ref={materialRef} // Usamos ref para manipular el material manualmente
        transparent
        // Los valores iniciales dan igual, los sobrescribe el useFrame
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
  
  return (
    <div 
      className="fixed inset-0 -z-10 h-full w-full transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: mode === 'orbit' ? '#050505' : '#00101F' }}
    >
      <Canvas 
        camera={{ position: [0, 0, 1] }} 
        // Creamos la niebla inicial. El color y densidad se actualizarán frame a frame.
        onCreated={({ scene }) => {
           scene.fog = new THREE.FogExp2('#050505', 0);
        }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}