"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const paths = [
  { label: "實", subtitle: "REALITY", href: "/real", delay: 0 },
  { label: "虛", subtitle: "VIRTUAL", href: "/virtual", delay: 1 },
];

export default function Lobby() {
  const router = useRouter();

  return (
    <motion.main
      className="screen-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        overflowY: "auto",
      }}
    >
      <h1 style={{ margin: "0 0 1rem", color: "#D4AF37", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.5rem", textAlign: "center" }}>
        THE LOBBY
      </h1>
      <p style={{ marginBottom: "clamp(2rem, 6vw, 4rem)", color: "#D4AF37" }}>SELECT YOUR PATH</p>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "3rem" }}>
        {paths.map((path) => (
          <motion.button
            key={path.href}
            type="button"
            aria-label={`前往${path.subtitle}展區`}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.3)" }}
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: path.delay }}
            onClick={() => router.push(path.href)}
            style={{
              display: "flex",
              width: "min(250px, 72vw)",
              height: "min(400px, 50vh)",
              minHeight: "300px",
              cursor: "pointer",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "inherit",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid #333",
              borderRadius: "15px",
              backdropFilter: "blur(10px)",
            }}
          >
            <span style={{ color: "#D4AF37", fontSize: "4rem" }}>{path.label}</span>
            <span style={{ letterSpacing: "3px", opacity: 0.6 }}>{path.subtitle}</span>
          </motion.button>
        ))}
      </div>

      <button className="nav-btn" style={{ marginTop: "5rem", opacity: 0.7 }} onClick={() => router.push("/about")}>
        ← BACK TO INTRO
      </button>
    </motion.main>
  );
}
