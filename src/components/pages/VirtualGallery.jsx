"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function VirtualGallery({ collections }) {
  const router = useRouter();
  const [rotation, setRotation] = useState(0);
  const angle = 360 / collections.length;
  const radius = 1800;

  // 每張卡片平均分布在同一個圓周；按鈕只改變整個圓環的 Y 軸角度。

  return (
    <main
      className="screen-shell"
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#010101",
        perspective: "2000px",
      }}
    >
      <div style={{ position: "absolute", top: "clamp(20px, 5vw, 40px)", left: "clamp(20px, 5vw, 40px)", zIndex: 100 }}>
        <button className="nav-btn" onClick={() => router.push("/lobby")}>← BACK TO LOBBY</button>
        <h1 style={{ marginTop: "1.2rem", color: "#D4AF37", fontSize: "clamp(1.5rem, 5vw, 2.2rem)", fontWeight: 300, letterSpacing: "clamp(5px, 2vw, 12px)" }}>
          VIRTUAL
        </h1>
      </div>

      <button
        className="nav-btn"
        aria-label="上一個虛擬作品集"
        style={{ position: "absolute", top: "50%", left: "clamp(12px, 4vw, 4%)", zIndex: 100, padding: "20px", borderRadius: "50%", transform: "translateY(-50%)" }}
        onClick={() => setRotation((value) => value + angle)}
      >
        ◀
      </button>
      <button
        className="nav-btn"
        aria-label="下一個虛擬作品集"
        style={{ position: "absolute", top: "50%", right: "clamp(12px, 4vw, 4%)", zIndex: 100, padding: "20px", borderRadius: "50%", transform: "translateY(-50%)" }}
        onClick={() => setRotation((value) => value - angle)}
      >
        ▶
      </button>

      <motion.div
        initial={{ z: -radius }}
        animate={{ z: -radius, rotateY: rotation }}
        transition={{ type: "tween", duration: 0.8, ease: "easeInOut" }}
        style={{ position: "relative", width: "min(320px, 62vw)", height: "min(480px, 62vh)", transformStyle: "preserve-3d" }}
      >
        {collections.map((item, index) => (
          <div
            key={item.id}
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              transform: `rotateY(${index * angle}deg) translateZ(${radius}px)`,
            }}
          >
            <motion.button
              type="button"
              aria-label={`開啟 ${item.en} 作品集`}
              whileHover={{ scale: 1.05, borderColor: "#00E5FF", boxShadow: "0 0 50px rgba(0,229,255,0.3)" }}
              onClick={() => router.push(`/virtual/${item.id}`)}
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                cursor: "pointer",
                flexDirection: "column",
                padding: "12px",
                color: "inherit",
                background: "rgba(212, 175, 55, 0.02)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                borderRadius: "4px",
                boxShadow: "0 0 60px rgba(0,0,0,0.6)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "75%", marginBottom: "15px", overflow: "hidden", background: "#000" }}>
                {/* 旋轉環上的封面一律使用縮圖，避免所有高解析 PNG 同時占用瀏覽器記憶體。 */}
                <Image
                  src={`/virtual/${item.id}/${item.cover}`}
                  alt={item.en}
                  fill
                  sizes="(max-width: 768px) 62vw, 320px"
                  priority={index === 0}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ display: "flex", flexGrow: 1, alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <h2 style={{ margin: 0, color: "#D4AF37", fontSize: "clamp(1rem, 4vw, 1.6rem)", fontWeight: 700, letterSpacing: "3px" }}>
                  {item.en}
                </h2>
              </div>
            </motion.button>
          </div>
        ))}
      </motion.div>

      <div style={{ position: "absolute", bottom: "30px", color: "#555", fontSize: "0.7rem", letterSpacing: "4px", textAlign: "center" }}>
        {collections.length} VIRTUAL ENTITIES REGISTERED
      </div>
    </main>
  );
}
