"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function VirtualRoomTemplate({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <cylinderGeometry args={[2, 2, 3, 32, 1, true, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#D4AF37" wireframe side={THREE.DoubleSide} opacity={0.3} transparent />
      </mesh>
    </group>
  );
}

// React Three Fiber 每一幀都會呼叫 useFrame，讓圓形展廳平滑轉向目標角度。
export function VirtualGallery3D({ rooms }) {
  const carouselRef = useRef(null);
  const [targetRotation] = useState(0);
  const radius = 10;
  const angleStep = (Math.PI * 2) / rooms.length;

  useFrame((_, delta) => {
    if (carouselRef.current) {
      carouselRef.current.rotation.y = THREE.MathUtils.damp(
        carouselRef.current.rotation.y,
        targetRotation,
        4,
        delta,
      );
    }
  });

  return (
    <group ref={carouselRef}>
      {rooms.map((room, index) => {
        const angle = index * angleStep;
        return (
          <VirtualRoomTemplate
            key={room}
            position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
            rotation={[0, angle, 0]}
          />
        );
      })}
    </group>
  );
}
