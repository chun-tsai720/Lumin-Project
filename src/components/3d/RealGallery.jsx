"use client";

import { useRef } from "react";
import { ScrollControls } from "@react-three/drei";
import * as THREE from "three";

function RealRoomTemplate({ position }) {
  return (
    <group position={position}>
      <mesh position={[-3, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial color="#111" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[3, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial color="#111" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, -1.9]}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </group>
  );
}

// 保留的 WebGL 展廳原型：未來要從 CSS 景深升級成真正 3D 場景時可直接接入。
export function RealGallery3D({ rooms }) {
  const group = useRef(null);

  return (
    <ScrollControls pages={rooms.length} damping={0.2} distance={1}>
      <group ref={group}>
        {rooms.map((room, index) => (
          <RealRoomTemplate key={room} position={[0, 0, index * -10]} />
        ))}
      </group>
    </ScrollControls>
  );
}
