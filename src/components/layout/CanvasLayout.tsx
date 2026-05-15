import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

export function CanvasLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen bg-lumin-black overflow-hidden relative text-[#D4AF37]">
      
      {/* Background 2D Elements (from index.css) */}
      <div className="bg-grid"></div>
      <div className="ambient-light animate-pulse-slow"></div>

      {/* Background 3D Canvas (z-index 0) */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <color attach="background" args={['transparent']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#D4AF37" />
          <Suspense fallback={null}>
             {/* Dynamic 3D Scene based on route can go here, or handled within pages */}
          </Suspense>
        </Canvas>
      </div>

      {/* Foreground UI Overlay (z-index 10) */}
      <div className="relative z-10 pointer-events-none">
        {children}
      </div>
    </div>
  );
}
