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
    // 外層底色：極致黑
    <main className={`min-h-screen bg-[#050505] flex items-center justify-center transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* 主容器：使用固定 max-w 與適當 gap，桌機雙欄、手機單欄 */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-28 max-w-5xl w-full px-6 md:px-10 py-12">

        {/* ========================================== */}
        {/* 左側：方形照片 + 姓名 18px + 學號 15px */}
        {/* ========================================== */}
        <section className="flex flex-col items-center flex-shrink-0">
          {/* 照片容器：強制鎖定寬高為 280px 正方形，絕對不會再溢出或變巨大 */}
          <div className="w-[280px] h-[280px] mb-8 overflow-hidden bg-zinc-900 border border-zinc-800">
            <img 
              src="/chun.jpg" 
              alt="蔡濬守" 
              className="w-full h-full object-cover grayscale opacity-90" 
            />
          </div>
          
          {/* 文字區：依據你的要求精準設定 */}
          <div className="text-center flex flex-col gap-2">
            {/* 姓名改成 18px */}
            <h1 className="text-[18px] tracking-[0.25em] text-white font-medium">蔡濬守</h1>
            {/* 其他字體（學號）15px */}
            <h2 className="text-[15px] tracking-[0.3em] text-zinc-400">91139127</h2>
          </div>
        </section>

        {/* ========================================== */}
        {/* 右側：原來的介紹文字（15px）+ 框線按鈕 */}
        {/* ========================================== */}
        <section className="max-w-[450px] w-full flex flex-col justify-center">
          {/* 介紹文字：全部精準鎖定 15px，行高舒適 */}
          <div className="text-[15px] leading-[2.1] tracking-widest text-zinc-300 font-light mb-10 text-justify md:text-left">
            <p className="mb-6">
              過去，我透過觀景窗捕捉光影的輪廓；<br />
              現在，我透過 Prompt 與程式碼生成未知的視界。
            </p>
            <p>
              <span className="text-[#DDAA33]">《映光Lumin》</span> 不僅是一個作品集，這是我將實體的過往，解構並重組為「數位自我」的過渡儀式。
            </p>
          </div>

          {/* 按鈕區：文字同樣鎖定 15px 的極簡框線鈕 */}
          <nav className="flex gap-4">
            <button
              className="px-6 py-3 text-[14px] tracking-[0.2em] text-zinc-500 border border-zinc-800 hover:border-[#DDAA33] hover:text-[#DDAA33] transition-all duration-300"
              onClick={() => handleNavigation('/')}
            >
              ← BACK TO COVER
            </button>
            <button
              className="px-6 py-3 text-[14px] tracking-[0.2em] text-[#DDAA33] border border-zinc-800 hover:border-[#DDAA33] transition-all duration-300"
              onClick={() => handleNavigation('/lobby')}
            >
              ENTER LOBBY →
            </button>
          </nav>
        </section>

      </div>
    </main>
  );
}import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IntroCard() {
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setIsExiting(true);
    setTimeout(() => navigate(path), 500);
  };

  return (
    // 外層底色：極致黑
    <main className={`min-h-screen bg-[#050505] flex items-center justify-center transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* 主容器：使用固定 max-w 與適當 gap，桌機雙欄、手機單欄 */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-28 max-w-5xl w-full px-6 md:px-10 py-12">

        {/* ========================================== */}
        {/* 左側：方形照片 + 姓名 18px + 學號 15px */}
        {/* ========================================== */}
        <section className="flex flex-col items-center flex-shrink-0">
          {/* 照片容器：強制鎖定寬高為 280px 正方形，絕對不會再溢出或變巨大 */}
          <div className="w-[280px] h-[280px] mb-8 overflow-hidden bg-zinc-900 border border-zinc-800">
            <img 
              src="/chun.jpg" 
              alt="蔡濬守" 
              className="w-full h-full object-cover grayscale opacity-90" 
            />
          </div>
          
          {/* 文字區：依據你的要求精準設定 */}
          <div className="text-center flex flex-col gap-2">
            {/* 姓名改成 18px */}
            <h1 className="text-[18px] tracking-[0.25em] text-white font-medium">蔡濬守</h1>
            {/* 其他字體（學號）15px */}
            <h2 className="text-[15px] tracking-[0.3em] text-zinc-400">91139127</h2>
          </div>
        </section>

        {/* ========================================== */}
        {/* 右側：原來的介紹文字（15px）+ 框線按鈕 */}
        {/* ========================================== */}
        <section className="max-w-[450px] w-full flex flex-col justify-center">
          {/* 介紹文字：全部精準鎖定 15px，行高舒適 */}
          <div className="text-[15px] leading-[2.1] tracking-widest text-zinc-300 font-light mb-10 text-justify md:text-left">
            <p className="mb-6">
              過去，我透過觀景窗捕捉光影的輪廓；<br />
              現在，我透過 Prompt 與程式碼生成未知的視界。
            </p>
            <p>
              <span className="text-[#DDAA33]">《映光Lumin》</span> 不僅是一個作品集，這是我將實體的過往，解構並重組為「數位自我」的過渡儀式。
            </p>
          </div>

          {/* 按鈕區：文字同樣鎖定 15px 的極簡框線鈕 */}
          <nav className="flex gap-4">
            <button
              className="px-6 py-3 text-[14px] tracking-[0.2em] text-zinc-500 border border-zinc-800 hover:border-[#DDAA33] hover:text-[#DDAA33] transition-all duration-300"
              onClick={() => handleNavigation('/')}
            >
              ← BACK TO COVER
            </button>
            <button
              className="px-6 py-3 text-[14px] tracking-[0.2em] text-[#DDAA33] border border-zinc-800 hover:border-[#DDAA33] transition-all duration-300"
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