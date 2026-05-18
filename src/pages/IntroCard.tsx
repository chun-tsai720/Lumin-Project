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
    <main style={{ minHeight: '100vh', backgroundColor: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.5s' }} className={isExiting ? 'opacity-0' : 'opacity-100'}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '80px', maxWidth: '1000px', width: '100%', padding: '0 40px' }}>

        {/* 左側：縮小版方形照片與文字 */}
        {/* 總監修正：flexDirection 必須是 'column'，原本寫 'col' 網頁排版會死機 */}
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
          {/* 用最高權重 style 鎖死正方形 180px，任何外部 CSS 都動不了它 */}
          <div style={{ width: '180px', height: '180px', overflow: 'hidden', backgroundColor: '#18181b', border: '1px solid #27272a', marginBottom: '24px' }}>
            <img 
              src="/chun.jpg" 
              alt="蔡濬守" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              className="grayscale opacity-90"
            />
          </div>
          
          {/* 學號在上 13px，姓名在下 16px */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '13px', letterSpacing: '0.2em', color: '#a1a1aa' }}>91139127</div>
            <h1 style={{ fontSize: '16px', letterSpacing: '0.3em', color: '#ffffff', fontWeight: 500, margin: 0 }}>蔡濬守</h1>
          </div>
        </section>

        {/* 右側：介紹文字（縮小至 13px）與框線按鈕 */}
        <section style={{ maxWidth: '420px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '13px', lineHeight: '2.2', letterSpacing: '0.15em', color: '#d4d4d8', marginBottom: '40px' }} className="font-light text-justify md:text-left">
            <p style={{ marginBottom: '16px', margin: 0 }}>
              過去，我透過觀景窗捕捉光影的輪廓；<br />
              現在，我透過 Prompt 與程式碼生成未知的視界。
            </p>
            <p style={{ margin: 0, marginTop: '16px' }}>
              <span style={{ color: '#DDAA33' }}>《映光Lumin》</span> 不僅是一個作品集，這是我將實體的過往，解構並重組為「數位自我」的過渡儀式。
            </p>
          </div>

          {/* 按鈕區 */}
          <nav style={{ display: 'flex', gap: '16px' }}>
            <button
              style={{ padding: '10px 20px', fontSize: '11px', letterSpacing: '0.25em', color: '#71717a', border: '1px solid #27272a', backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 0.3s' }}
              onClick={() => handleNavigation('/')}
            >
              ← BACK TO COVER
            </button>
            <button
              style={{ padding: '10px 20px', fontSize: '11px', letterSpacing: '0.25em', color: '#DDAA33', border: '1px solid #27272a', backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 0.3s' }}
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