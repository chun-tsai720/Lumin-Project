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
          <img src="/chun.jpg" alt="蔡濬守" />
        </figure>
        <div className="creator-info">
          <div className="text-3xl tracking-[0.5em] font-bold text-white mt-4">蔡濬守</div>
          <div className="text-xl tracking-[0.3em] text-gray-400 mt-2">91139127</div>
        </div>
      </section>

      <section className="text-section">
        <div className="text-lg leading-[2.5] tracking-widest text-gray-300 mb-12 font-light">
          過去，我透過觀景窗捕捉光影的輪廓；<br />
          現在，我透過 Prompt 與程式碼生成未知的視界。<br /><br />
          <span className="highlight">《映光Lumin》</span>不僅是一個作品集，這是我將實體的過往，解構並重組為「數位自我」的過渡儀式。
        </div>
        <nav className="nav-controls">
          <button className="nav-btn" onClick={() => handleNavigation('/')}>
            ← BACK TO COVER
          </button>
          <button className="nav-btn" onClick={() => handleNavigation('/lobby')}>
            ENTER LOBBY →
          </button>
        </nav>
      </section>
    </main>
  );
}