import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="screen-shell"
      style={{ display: "grid", minHeight: "100vh", placeItems: "center", background: "#050505" }}
    >
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#71717a", letterSpacing: "0.3em" }}>404 // SPACE NOT FOUND</p>
        <Link className="nav-btn" href="/lobby" style={{ marginTop: "24px" }}>
          BACK TO LOBBY
        </Link>
      </div>
    </main>
  );
}
