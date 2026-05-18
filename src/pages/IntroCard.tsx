import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 總監備註：這個元件使用 Tailwind CSS，請確保你的專案已安裝
export default function IntroCard() {
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setIsExiting(true);
    // 預留轉場動畫時間
    setTimeout(() => navigate(path), 500);
  };

  return (
    // 畫面大底，維持冷調極黑
    <main className={`min-h-screen bg-black text-gray-300 font-sans flex items-center justify-center p-6 md:p-10 transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* 畫面左上角的 Logo，一比一復刻截圖 */}
      <div className="absolute top-8 left-8 flex items-center gap-2">
        <span className="text-[#DDAA33] text-2xl font-bold tracking-tight">映光</span>
        <div className="flex flex-col text-xs tracking-[0.3em] text-gray-500 font-light mt-1">
          <span>LUMIN</span>
          <span>DIGITAL GALLERY</span>
        </div>
      </div>

      {/* 主體佈局：在桌機版是左右雙欄 (md:flex-row) */}
      <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24 max-w-7xl w-full">
        
        {/* ============================== */}
        {/* 【左側】人像與名字元資料 */}
        {/* ============================== */}
        <section className="flex flex-col items-center flex-shrink-0">
          {/* 頭像：還原為「圓形」，並縮小至精緻的 w-56 h-56 */}
          <figure className="w-56 h-56 rounded-full overflow-hidden border-2 border-gray-800 shadow-[0_0_60px_rgba(221,170,51,0.1)] mb-10">
            {/* 這裡要確保你的 /chun.jpg 檔案還在 */}
            <img 
              src="/chun.jpg" 
              alt="蔡濬守 JUN" 
              className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
            />
          </figure>
          
          <div className="text-center">
            {/* 名字：還原為大氣的黃金品牌色 (#DDAA33)，加大字距 */}
            <h1 className="text-4xl font-extrabold tracking-[0.25em] text-[#DDAA33]">蔡濬守</h1>
            {/* 學號：放下面，還原為低調灰 */}
            <h2 className="text-sm tracking-[0.3em] text-gray-500 mt-4 font-light">91139127</h2>
          </div>
        </section>

        {/* ============================== */}
        {/* 【右側】介紹文字與框線按鈕 */}
        {/* ============================== */}
        <section className="flex flex-col justify-center flex-grow max-w-[650px]">
          {/* 自介內文：還原舒適、易讀的行距 (leading-relaxed) 與字重 */}
          <div className="text-[1.1rem] leading-[2] tracking-wider text-gray-300 font-light mb-12">
            <p className="mb-8">
              過去，我透過觀景窗捕捉光影的輪廓；<br />
              現在，我透過 Prompt 與程式碼生成未知的視界。
            </p>
            
            <p>
              {/* 關鍵：將文字「映光Lumin」改為白色 font-normal，其餘維持灰色 */}
              <span className="text-white font-normal">《映光Lumin》</span>不僅是一個作品集，這是我將實體的過往，解構並重組為「數位自我」的過渡儀式。
            </p>
          </div>

          {/* 按鈕區：還原為帶有細框線的極簡按鈕，並同步品牌色樣式 */}
          <nav className="flex gap-6 mt-4">
            <button 
              className="px-8 py-3 text-xs tracking-[0.3em] text-gray-500 border border-gray-800 hover:border-[#DDAA33] hover:text-[#DDAA33] transition-all duration-300"
              onClick={() => handleNavigation('/')}
            >
              ← BACK TO COVER
            </button>
            <button 
              className="px-8 py-3 text-xs tracking-[0.3em] text-[#DDAA33] border border-[#DDAA33] hover:brightness-125 transition-all duration-300 shadow-[0_0_15px_rgba(221,170,51,0.15)]"
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