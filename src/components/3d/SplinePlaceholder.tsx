import { Html } from '@react-three/drei';

interface SplinePlaceholderProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  name: string;
}

export function SplinePlaceholder({ position = [0, 0, 0], rotation = [0, 0, 0], name }: SplinePlaceholderProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* 
        TODO: Future Spline Integration
        import Spline from '@splinetool/react-spline';
        <Spline scene="https://prod.spline.design/xxx/scene.splinecode" />
      */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#D4AF37" wireframe />
      </mesh>
      <Html center position={[0, -1, 0]}>
        <div className="text-lumin-gold text-xs whitespace-nowrap bg-black/80 border border-lumin-gold/30 px-3 py-1.5 rounded tracking-widest backdrop-blur-sm">
          [Spline Mount: {name}]
        </div>
      </Html>
    </group>
  );
}
