"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function IntroCard() {
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef(null);
  const router = useRouter();

  function handleNavigation(path) {
    if (timerRef.current) return;
    setIsExiting(true);
    timerRef.current = window.setTimeout(() => router.push(path), 500);
  }

  return (
    <main
      className="screen-shell"
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(32px, 6vw, 80px)",
        overflowY: "auto",
        backgroundColor: "#050505",
        opacity: isExiting ? 0 : 1,
        transition: "opacity 0.5s",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "1600px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(48px, 8vw, 160px)",
        }}
      >
        <section style={{ display: "flex", flexShrink: 0, flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: "min(360px, 72vw)",
              aspectRatio: "1",
              overflow: "hidden",
              marginBottom: "48px",
              backgroundColor: "#18181b",
              border: "2px solid #27272a",
            }}
          >
            <img
              src="/chun.jpg"
              alt="蔡濬守"
              className="grayscale opacity-90"
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "center" }}>
            <div style={{ color: "#a1a1aa", fontSize: "clamp(18px, 2vw, 26px)", letterSpacing: "0.2em" }}>
              91139127
            </div>
            <h1 style={{ margin: 0, color: "#fff", fontSize: "clamp(24px, 2.5vw, 32px)", fontWeight: 500, letterSpacing: "0.3em" }}>
              蔡濬守
            </h1>
          </div>
        </section>

        <section style={{ display: "flex", maxWidth: "850px", flex: "1 1 520px", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              marginBottom: "clamp(40px, 5vw, 80px)",
              color: "#d4d4d8",
              fontSize: "clamp(18px, 2vw, 26px)",
              fontWeight: 300,
              lineHeight: 2.2,
              letterSpacing: "0.12em",
            }}
          >
            <p style={{ margin: 0 }}>
              過去，我透過觀景窗捕捉光影的輪廓；
              <br />
              現在，我透過 Prompt 與程式碼生成未知的視界。
            </p>
            <p style={{ margin: "32px 0 0" }}>
              <span style={{ color: "#DDAA33" }}>《映光 Lumin》</span>
              不僅是一個作品集，這是我將實體的過往，解構並重組為「數位自我」的過渡儀式。
            </p>
          </div>

          <nav style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            <button className="nav-btn" onClick={() => handleNavigation("/")}>
              ← BACK TO COVER
            </button>
            <button className="nav-btn" onClick={() => handleNavigation("/lobby")}>
              ENTER LOBBY →
            </button>
          </nav>
        </section>
      </div>
    </main>
  );
}
