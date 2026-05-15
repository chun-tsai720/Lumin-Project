import { useRef } from 'react';
import { useScroll, ScrollControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RealRoomTemplate({ position, title }: { position: [number, number, number], title: string }) {
  return (
    <group position={position}>
      {/* 左虛擬牆面 */}
      <mesh position={[-3, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial color="#111" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* 右虛擬牆面 */}
      <mesh position={[3, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial color="#111" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* 藝術品預留區 */}
      <mesh position={[0, 0, -1.9]}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* 可以在這裡加入 3D 文字標示 title */}
    </group>
  );
}

export function RealGallery({ rooms }: { rooms: string[] }) {
  const group = useRef<THREE.Group>(null);

  return (
    <ScrollControls pages={rooms.length} damping={0.2} distance={1}>
      <group ref={group}>
        {rooms.map((room, index) => (
          <RealRoomTemplate key={room} position={[0, 0, index * -10]} title={room} />
        ))}
      </group>
    </ScrollControls>
  );
}
