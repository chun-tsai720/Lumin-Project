"use client";

import { Html } from "@react-three/drei";

// Spline 尚未接入前的 3D 掛載點，讓場景設計時仍能看見預定位置。
export function SplinePlaceholder({ position = [0, 0, 0], rotation = [0, 0, 0], name }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#D4AF37" wireframe />
      </mesh>
      <Html center position={[0, -1, 0]}>
        <div className="whitespace-nowrap rounded border border-lumin-gold/30 bg-black/80 px-3 py-1.5 text-xs tracking-widest text-lumin-gold backdrop-blur-sm">
          [Spline Mount: {name}]
        </div>
      </Html>
    </group>
  );
}
