"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";

function CollectionCard({ item, index, count, scrollYProgress }) {
  // 每張卡片各自呼叫動畫 Hook，避免在父元件的 map 迴圈中違反 Hooks 規則。
  const router = useRouter();
  const segment = 1 / count;
  const focusPoint = index * segment;
  const startZ = index === 0 ? 0 : -3000;
  const startOpacity = index === 0 ? 1 : 0;
  const z = useTransform(scrollYProgress, [focusPoint - segment, focusPoint, focusPoint + segment], [startZ, 0, 1500]);
  const opacity = useTransform(
    scrollYProgress,
    [focusPoint - segment * 0.5, focusPoint, focusPoint + segment * 0.5],
    [startOpacity, 1, 0],
  );
  const pointerEvents = useTransform(opacity, (value) => (value > 0.1 ? "auto" : "none"));

  return (
    <motion.button
      type="button"
      aria-label={`開啟${item.name}作品集`}
      whileHover={{ scale: 1.05 }}
      onClick={() => router.push(`/real/${item.id}`)}
      style={{ position: "absolute", z, opacity, pointerEvents, cursor: "pointer", color: "inherit", background: "none", border: 0 }}
    >
      <div
        style={{
          display: "flex",
          width: "min(320px, 72vw)",
          height: "min(500px, 68vh)",
          flexDirection: "column",
          padding: "15px",
          background: "rgba(212, 175, 55, 0.05)",
          border: "1px solid rgba(212, 175, 55, 0.2)",
          borderRadius: "5px",
          boxShadow: "0 30px 60px rgba(0,0,0,0.8)",
          backdropFilter: "blur(15px)",
        }}
      >
        <div style={{ width: "100%", height: "70%", marginBottom: "20px", overflow: "hidden", background: "#111" }}>
          <img src={`/real/${item.id}/${item.cover}`} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0, color: "#D4AF37", fontSize: "clamp(3rem, 8vh, 4.5rem)", lineHeight: 1 }}>{item.name}</h2>
          <p style={{ marginTop: "10px", color: "#888", fontSize: "0.65rem", letterSpacing: "8px" }}>{item.en}</p>
        </div>
      </div>
    </motion.button>
  );
}

export default function RealGallery({ collections }) {
  const router = useRouter();
  const scrollContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });

  // scrollYProgress 會把整段長頁面的捲動距離正規化成 0～1，
  // CollectionCard 再把自己的區段換算成前後景深與透明度。

  return (
    <main
      ref={scrollContainerRef}
      className="screen-shell"
      style={{ height: "100vh", overflowX: "hidden", overflowY: "scroll", background: "#050505" }}
    >
      <div style={{ width: "100%", height: `${collections.length * 100}vh` }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            display: "flex",
            width: "100%",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            perspective: "1200px",
          }}
        >
          <div style={{ position: "absolute", top: "clamp(20px, 5vw, 40px)", left: "clamp(20px, 5vw, 40px)", zIndex: 100 }}>
            <button className="nav-btn" onClick={() => router.push("/lobby")}>← BACK TO LOBBY</button>
          </div>

          {collections.map((item, index) => (
            <CollectionCard
              key={item.id}
              item={item}
              index={index}
              count={collections.length}
              scrollYProgress={scrollYProgress}
            />
          ))}

          <div style={{ position: "absolute", bottom: "30px", fontSize: "0.7rem", letterSpacing: "4px", opacity: 0.4 }}>
            SCROLL TO TRAVEL
          </div>
        </div>
      </div>
    </main>
  );
}
