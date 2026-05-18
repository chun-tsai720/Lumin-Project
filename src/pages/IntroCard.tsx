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

      {/* 右側文字與控制區 */}
      <section className="text-section flex flex-col justify-center -mt-20"> {/* -mt-20 負責將文字整體往上提 */}
        <div className="max-w-[500px]">
          {/* 自介段落：調整為黃金行距 1.8，字距稍微收斂到 0.1em */}
          <div className="text-[1.1rem] leading-[1.8] tracking-[0.1em] text-gray-300 font-light mb-10">
            過去，我透過觀景窗捕捉光影的輪廓；<br />
            現在，我透過 Prompt 與程式碼生成未知的視界。<br /><br />
            <span className="text-[#DDAA33] font-normal">《映光Lumin》</span>不僅是一個作品集，這是我將實體的過往，解構並重組為「數位自我」的過渡儀式。
          </div>

          {/* 按鈕區 */}
          <nav className="flex gap-8">
            <button 
              className="text-sm tracking-[0.2em] text-gray-500 hover:text-[#DDAA33] transition-colors border-b border-gray-800 pb-1"
              onClick={() => handleNavigation('/')}
            >
              ← BACK TO COVER
            </button>
            <button 
              className="text-sm tracking-[0.2em] text-[#DDAA33] hover:brightness-125 transition-all border-b border-[#DDAA33] pb-1"
              onClick={() => handleNavigation('/lobby')}
            >
              ENTER LOBBY →
            </button>
          </nav>
        </div>
      </section>
    </main>
  );
}