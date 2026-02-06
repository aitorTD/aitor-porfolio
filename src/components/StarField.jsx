import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function Stars(props) {
  const ref = useRef();

  // Generamos las posiciones manualmente para evitar errores de librerías externas
  const sphere = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3); // x, y, z por cada estrella

    for (let i = 0; i < count; i++) {
      // Algoritmo simple para distribuir puntos en una esfera
      const r = 1.5 * Math.cbrt(Math.random()); // Radio aleatorio (con raíz cúbica para distribución uniforme)
      const theta = Math.random() * 2 * Math.PI; // Ángulo plano
      const phi = Math.acos(2 * Math.random() - 1); // Ángulo de elevación

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#F2F2F2"
          size={0.002} // AUMENTADO: De 0.002 a 0.005 (ahora se verán)
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function StarField() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-[#050505]">
      {/* Añadimos bg-space-black aquí también para evitar flashes blancos */}
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
      </Canvas>
    </div>
  );
}
