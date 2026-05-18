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
          {/* 照片縮小：設定為 w-36 h-36 (約 144px)，比原本精緻很多 */}
          <figure className="w-36 h-36 rounded-full overflow-hidden border border-gray-700">
            <img src="/chun.jpg" alt="蔡濬守" className="w-full h-full object-cover" />
          </figure>
          <div className="text-center mt-5">
            {/* 姓名：精準鎖定 18px */}
            <h1 className="text-[18px] tracking-widest font-medium text-white">蔡濬守</h1>
            {/* 學號：精準鎖定 15px */}
            <h2 className="text-[15px] tracking-widest text-gray-400 mt-2">91139127</h2>
          </div>
        </section>

        {/* 右側：介紹文字與按鈕 */}
        <section className="flex flex-col justify-center">
          <div className="max-w-[500px]">
            {/* 介紹文字：精準鎖定 15px */}
            <p className="text-[15px] leading-loose tracking-wider text-gray-300 font-light mb-10">
              過去，我透過觀景窗捕捉光影的輪廓；<br />
              現在，我透過 Prompt 與程式碼生成未知的視界。<br /><br />
              <span className="text-white font-normal">《映光Lumin》</span>不僅是一個作品集，這是我將實體的過往，解構並重組為「數位自我」的過渡儀式。
            </p>

            {/* 按鈕區：精準鎖定 15px */}
            <nav className="flex gap-8">
              <button 
                className="text-[15px] tracking-widest text-gray-500 hover:text-white transition-colors pb-1 border-b border-transparent hover:border-white"
                onClick={() => handleNavigation('/')}
              >
                ← BACK TO COVER
              </button>
              <button 
                className="text-[15px] tracking-widest text-white hover:text-gray-300 transition-all pb-1 border-b border-white"
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