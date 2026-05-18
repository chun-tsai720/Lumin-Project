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
    <main className={`min-h-screen bg-[#050505] flex items-center justify-center transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col md:flex-row items-center justify-center gap-20 lg:gap-32 max-w-5xl px-10">

        {/* 左側：縮小的方形黑白照片與極簡文字 */}
        <section className="flex flex-col items-center">
          {/* 方形照片，尺寸縮小為 240px，並加上灰階效果還原冷調感 */}
          <figure className="w-[240px] h-[240px] mb-6 overflow-hidden bg-zinc-900">
            <img src="/chun.jpg" alt="Creator" className="w-full h-full object-cover grayscale opacity-90" />
          </figure>
          {/* 學號在上，姓名在下，字體極小 */}
          <div className="text-center flex flex-col gap-2">
            <div className="text-[12px] tracking-[0.2em] text-gray-400">91139127</div>
            <div className="text-[14px] tracking-[0.3em] text-gray-200">蔡濬守</div>
          </div>
        </section>

        {/* 右側：介紹文字與極簡框線按鈕 */}
        <section className="max-w-[450px] flex flex-col justify-center">
          <div className="text-[14px] leading-[2.2] tracking-widest text-gray-400 font-light mb-12">
            <p className="mb-6">
              過去，我透過觀景窗捕捉光影的輪廓；<br />
              現在，我透過 Prompt 與程式碼生成未知的視界。
            </p>
            <p>
              <span className="text-[#DDAA33]">《映光Lumin》</span> 不僅是一個作品集，這是我將實體的過往，解構並重組為「數位自我」的過渡儀式。
            </p>
          </div>

          <nav className="flex gap-6">
            <button
              className="px-6 py-3 text-[11px] tracking-[0.25em] text-gray-500 border border-gray-800 hover:border-[#DDAA33] hover:text-[#DDAA33] transition-all"
              onClick={() => handleNavigation('/')}
            >
              ← BACK TO COVER
            </button>
            <button
              className="px-6 py-3 text-[11px] tracking-[0.25em] text-[#DDAA33] border border-gray-800 hover:border-[#DDAA33] transition-all"
              onClick={() => handleNavigation('/lobby')}
            >
              ENTER LOBBY →
            </button>
          </nav>
        </section>

      </div>
    </main>
  );
}
