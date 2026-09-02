import Link from "next/link";

export default function CoverPage() {
  return (
    <main
      className="screen-shell"
      style={{ display: "grid", minHeight: "100vh", placeItems: "center", background: "#000" }}
    >
      <div style={{ padding: "32px", textAlign: "center" }}>
        <img
          src="/logo.png"
          alt="LUMIN Logo"
          style={{ width: "min(800px, 88vw)", height: "auto", marginBottom: "2rem" }}
        />
        <br />
        <Link className="nav-btn" href="/about">
          ENTER THE SPACE
        </Link>
      </div>
    </main>
  );
}
