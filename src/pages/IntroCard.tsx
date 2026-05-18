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
      <div className="flex gap-16 max-w-7xl px-10">
        {/* 左側：人像與名字元資料 */}
        <section className="flex flex-col items-center flex-shrink-0">
          <figure className="w-48 h-48 rounded-full overflow-hidden border-2 border-gray-700 shadow-2xl">
            <img src="/chun.jpg" alt="蔡濬守" className="w-full h-full object-cover" />
          </figure>
          <div className="text-center mt-8">
            {/* 關鍵：名字字體顏色改為品牌金 #DDAA33，使用專業大氣的字距與大小 */}
            <h1 className="text-4xl font-bold tracking-[0.25em] text-[#DDAA33]">蔡濬守</h1>
            <h2 className="text-sm tracking-[0.3em] text-gray-500 mt-3">91139127</h2>
          </div>
        </section>

        {/* 右側：介紹文字與控制區 (還原為最耐看的樣式與行距) */}
        <section className="flex flex-col justify-center">
          <div className="max-w-[600px]">
            {/* 自介內文：還原為原本舒適、易讀的樣式 (leading-relaxed, tracking-wide) */}
            <p className="text-[1.05rem] leading-relaxed tracking-wide text-gray-300 font-light mb-12">
              過去，我透過觀景窗捕捉光影的輪廓；<br />
              現在，我透過 Prompt 與程式碼生成未知的視界。<br /><br />
              <span className="text-white font-normal">《映光Lumin》</span>不僅是一個作品集，這是我將實體的過往，解構並重組為「數位自我」的過渡儀式。
            </p>

            {/* 按鈕區 (樣式與顏色保持與名字品牌金同步) */}
            <nav className="flex gap-8">
              <button 
                className="text-sm tracking-[0.2em] text-gray-500 hover:text-[#DDAA33] transition-colors pb-1 border-b border-transparent hover:border-[#DDAA33]"
                onClick={() => handleNavigation('/')}
              >
                ← BACK TO COVER
              </button>
              <button 
                className="text-sm tracking-[0.2em] text-[#DDAA33] hover:brightness-125 transition-all pb-1 border-b border-[#DDAA33]"
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