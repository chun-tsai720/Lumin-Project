import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function VirtualRoomTemplate({ position, rotation, title }: { position: [number, number, number], rotation: [number, number, number], title: string }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <cylinderGeometry args={[2, 2, 3, 32, 1, true, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#D4AF37" wireframe side={THREE.DoubleSide} opacity={0.3} transparent />
      </mesh>
      {/* 藝術品掛載點 / 虛擬全息投影位置 */}
    </group>
  );
}

export function VirtualGallery({ rooms }: { rooms: string[] }) {
  const carouselRef = useRef<THREE.Group>(null);
  const [targetRotation, setTargetRotation] = useState(0);

  const radius = 10;
  const angleStep = (Math.PI * 2) / rooms.length;

  useFrame((state, delta) => {
    if (carouselRef.current) {
      // 緩動旋轉至目標角度
      carouselRef.current.rotation.y = THREE.MathUtils.damp(
        carouselRef.current.rotation.y,
        targetRotation,
        4,
        delta
      );
    }
  });

  return (
    <group ref={carouselRef}>
      {rooms.map((room, index) => {
        const angle = index * angleStep;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        return (
          <VirtualRoomTemplate 
            key={room} 
            position={[x, 0, z]} 
            rotation={[0, angle, 0]} 
            title={room} 
          />
        );
      })}
    </group>
  );
}
