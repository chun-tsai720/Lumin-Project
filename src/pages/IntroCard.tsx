import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IntroCard() {
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setIsExiting(true);
    setTimeout(() => navigate(path), 500);
  };

  return (
    <main className={`curation-container ${isExiting ? 'exiting' : ''}`}>
      <section className="visual-section">
        <figure className="image-wrapper">
          <img src="/chun.jpg" alt="蔡溶守" />
        </figure>
        <div className="creator-info">
          <div className="id">91139127</div>
          <div className="name">蔡溶守</div>
        </div>
      </section>

      <section className="text-section">
        <div className="statement-text">
          過去，我透過觀景窗捕捉光影的輪廓；<br />
          現在，我透過 Prompt 與程式碼生成未知的視界。<br /><br />
          <span className="highlight">《映光Lumin》</span>不僅是一個作品集，這是我將實體的過往，解構並重組為「數位自我」的過渡儀式。
        </div>
        <nav className="nav-controls">
          <button className="nav-btn" onClick={() => handleNavigation('/')}>
            ← 退回封面
          </button>
          <button className="nav-btn" onClick={() => handleNavigation('/lobby')}>
            進入展間 →
          </button>
        </nav>
      </section>
    </main>
  );
}