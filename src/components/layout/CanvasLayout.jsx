"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

// 所有真正 WebGL 元件的共同畫布；前景 UI 仍可覆蓋在 Canvas 上方。
export function CanvasLayout({ children }) {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-lumin-black text-[#D4AF37]">
      <div className="pointer-events-auto fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <color attach="background" args={["transparent"]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#D4AF37" />
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      </div>
    </div>
  );
}
