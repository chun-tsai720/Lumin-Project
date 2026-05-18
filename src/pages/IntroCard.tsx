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
    <main className={`curation-container ${isExiting ? 'exiting' : ''} flex items-center justify-center min-h-screen bg-black`}>
      <div className="flex gap-16 max-w-5xl px-10 items-center">
        
        {/* 左側：人像與名字 */}
        <section className="flex flex-col items-center flex-shrink-0">
          <figure className="w-48 h-48 rounded-full overflow-hidden border border-gray-700">
            <img src="/chun.jpg" alt="蔡濬守" className="w-full h-full object-cover" />
          </figure>
          <div className="text-center mt-6">
            {/* 精準設定：蔡濬守 20px，91139127 18px */}
            <h1 className="text-[20px] tracking-widest font-medium text-white">蔡濬守</h1>
            <h2 className="text-[18px] tracking-widest text-gray-400 mt-2">91139127</h2>
          </div>
        </section>

        {/* 右側：原來的介紹文字與按鈕 */}
        <section className="flex flex-col justify-center">
          <div className="max-w-[500px]">
            <p className="text-lg leading-loose tracking-wider text-gray-300 font-light mb-10">
              過去，我透過觀景窗捕捉光影的輪廓；<br />
              現在，我透過 Prompt 與程式碼生成未知的視界。<br /><br />
              <span className="text-white font-normal">《映光Lumin》</span>不僅是一個作品集，這是我將實體的過往，解構並重組為「數位自我」的過渡儀式。
            </p>

            {/* 按鈕區 */}
            <nav className="flex gap-8">
              <button 
                className="text-sm tracking-widest text-gray-500 hover:text-white transition-colors pb-1 border-b border-transparent hover:border-white"
                onClick={() => handleNavigation('/')}
              >
                ← BACK TO COVER
              </button>
              <button 
                className="text-sm tracking-widest text-white hover:text-gray-300 transition-all pb-1 border-b border-white"
                onClick={() => handleNavigation('/lobby')}
              >
                ENTER LOBBY →
              </button>
            </nav>
          </div>
        </section>

      </div>
    </main>
  );
}