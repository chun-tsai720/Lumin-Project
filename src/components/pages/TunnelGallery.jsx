"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";

function GalleryCard({ filename, index, count, gallery, scrollYProgress, onSelect }) {
  // 把目前照片所屬的捲動區段映射成 Z 軸景深，形成穿越隧道的效果。
  const segment = 1 / count;
  const focusPoint = index * segment;
  const startZ = index === 0 ? 0 : -3000;
  const startOpacity = index === 0 ? 1 : 0;
  const z = useTransform(scrollYProgress, [focusPoint - segment, focusPoint, focusPoint + segment], [startZ, 0, 1200]);
  const opacity = useTransform(
    scrollYProgress,
    [focusPoint - segment * 0.7, focusPoint, focusPoint + segment * 0.7],
    [startOpacity, 1, 0],
  );
  const pointerEvents = useTransform(opacity, (value) => (value > 0.1 ? "auto" : "none"));

  return (
    <motion.button
      type="button"
      aria-label={`放大 ${filename}`}
      whileHover={{ scale: 1.02 }}
      onClick={() => onSelect(filename)}
      style={{
        position: "absolute",
        z,
        opacity,
        pointerEvents,
        cursor: "zoom-in",
        color: "inherit",
        background: "none",
        border: 0,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "min(420px, 76vw)",
          height: "min(540px, 68vh)",
          flexDirection: "column",
          alignItems: "center",
          padding: "clamp(14px, 3vw, 24px)",
          backgroundColor: "#09090b",
          border: "1px solid #1c1c1e",
          boxShadow: "0 30px 60px rgba(0,0,0,0.8)",
        }}
      >
        <div style={{ width: "100%", minHeight: 0, flexGrow: 1, overflow: "hidden", backgroundColor: "#000" }}>
          <img
            src={`/${gallery.kind}/${gallery.id}/${filename}`}
            alt={`${gallery.name}作品：${filename}`}
            className="grayscale transition-all duration-700 hover:grayscale-0"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <span style={{ marginTop: "20px", color: "#71717a", fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          {filename}
        </span>
      </div>
    </motion.button>
  );
}

export default function TunnelGallery({ gallery }) {
  const router = useRouter();
  const scrollContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const backPath = gallery.kind === "real" ? "/real" : "/virtual";

  // 實體與虛擬展間共用同一個元件，差異由伺服器傳入的 gallery 資料控制。

  return (
    <main
      ref={scrollContainerRef}
      className="screen-shell"
      style={{ width: "100vw", height: "100vh", overflowX: "hidden", overflowY: "scroll", backgroundColor: "#050505" }}
    >
      <div style={{ width: "100%", height: `${Math.max(gallery.files.length, 2) * 120}vh` }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            display: "flex",
            width: "100vw",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            perspective: "1500px",
          }}
        >
          <header style={{ position: "absolute", top: "clamp(20px, 5vw, 48px)", left: "clamp(20px, 5vw, 48px)", zIndex: 100, maxWidth: "80vw" }}>
            <button
              onClick={() => router.push(backPath)}
              style={{ padding: 0, cursor: "pointer", color: "#71717a", fontSize: "clamp(10px, 2vw, 13px)", letterSpacing: "0.2em", background: "transparent", border: 0 }}
            >
              ← BACK TO {gallery.kind === "real" ? "TUNNEL" : "VIRTUAL"}
            </button>
            <h1 style={{ margin: "16px 0 0", color: "#DDAA33", fontSize: "clamp(22px, 5vw, 42px)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
              {gallery.name}
            </h1>
            <p style={{ margin: "8px 0 0", color: "#71717a", fontSize: "clamp(9px, 2vw, 11px)", letterSpacing: "0.2em" }}>
              {gallery.subtitle}{" // "}{gallery.files.length} SLICES
            </p>
          </header>

          {gallery.files.map((filename, index) => (
            <GalleryCard
              key={filename}
              filename={filename}
              index={index}
              count={gallery.files.length}
              gallery={gallery}
              scrollYProgress={scrollYProgress}
              onSelect={setSelectedPhoto}
            />
          ))}

          <div style={{ position: "absolute", bottom: "28px", color: "#52525b", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
            SCROLL TO TRAVEL GALLERY
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedPhoto} 大圖`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              cursor: "zoom-out",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(20px, 5vw, 48px)",
              backgroundColor: "rgba(0,0,0,0.98)",
            }}
          >
            <figure style={{ maxWidth: "85vw", maxHeight: "76vh", margin: 0, overflow: "hidden", backgroundColor: "#000", border: "1px solid #27272a", boxShadow: "0 0 80px rgba(0,0,0,0.9)" }}>
              <img
                src={`/${gallery.kind}/${gallery.id}/${selectedPhoto}`}
                alt={`${gallery.name}作品大圖`}
                onClick={(event) => event.stopPropagation()}
                style={{ display: "block", maxWidth: "85vw", maxHeight: "76vh", objectFit: "contain" }}
              />
            </figure>
            <p style={{ margin: "24px 0 0", color: "#DDAA33", fontFamily: "monospace", fontSize: "13px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              VIEWPORT // {selectedPhoto}
            </p>
            <button
              onClick={() => setSelectedPhoto(null)}
              style={{ marginTop: "12px", cursor: "pointer", color: "#71717a", fontSize: "10px", letterSpacing: "0.25em", background: "none", border: 0 }}
            >
              CLOSE
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
