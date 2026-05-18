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
    <main 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: '#050505', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        transition: 'opacity 0.5s',
        opacity: isExiting ? 0 : 1
      }}
    >
      {/* 容器間距放大至 160px，確保大尺寸元素之間有足夠留白 */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '160px', maxWidth: '2000px', width: '100%', padding: '0 80px' }}>

        {/* 左側：放大 2 倍的方形照片與名牌 */}
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
          {/* 照片尺寸：精準鎖定為 360px 正方形 (原本 180px 的 2 倍) */}
          <div style={{ width: '360px', height: '360px', overflow: 'hidden', backgroundColor: '#18181b', border: '2px solid #27272a', marginBottom: '48px' }}>
            <img 
              src="/chun.jpg" 
              alt="蔡濬守" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              className="grayscale opacity-90"
            />
          </div>
          
          {/* 文字與垂直間距放大 2 倍：學號 26px，姓名 32px */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '26px', letterSpacing: '0.2em', color: '#a1a1aa' }}>91139127</div>
            <h1 style={{ fontSize: '32px', letterSpacing: '0.3em', color: '#ffffff', fontWeight: 500, margin: 0 }}>蔡濬守</h1>
          </div>
        </section>

        {/* 右側：放大 2 倍的介紹文字與框線按鈕 */}
        <section style={{ maxWidth: '850px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* 內文放大至 26px，維持 2.2 倍的優雅行高 */}
          <div style={{ fontSize: '26px', lineHeight: '2.2', letterSpacing: '0.15em', color: '#d4d4d8', marginBottom: '80px', fontWeight: 300, textAlign: 'justify' }}>
            <p style={{ marginBottom: '32px', margin: 0 }}>
              過去，我透過觀景窗捕捉光影的輪廓；<br />
              現在，我透過 Prompt 與程式碼生成未知的視界。
            </p>
            <p style={{ margin: 0, marginTop: '32px' }}>
              <span style={{ color: '#DDAA33' }}>《映光Lumin》</span> 不僅是一個作品集，這是我將實體的過往，解構並重組為「數位自我」的過渡儀式。
            </p>
          </div>

          {/* 按鈕與內襯墊放大 2 倍：字體 22px，邊框 2px */}
          <nav style={{ display: 'flex', gap: '32px' }}>
            <button
              style={{ padding: '20px 40px', fontSize: '22px', letterSpacing: '0.25em', color: '#71717a', border: '2px solid #27272a', backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 0.3s' }}
              className="hover:border-[#DDAA33] hover:text-[#DDAA33]"
              onClick={() => handleNavigation('/')}
            >
              ← BACK TO COVER
            </button>
            <button
              style={{ padding: '20px 40px', fontSize: '22px', letterSpacing: '0.25em', color: '#DDAA33', border: '2px solid #27272a', backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 0.3s' }}
              className="hover:border-[#DDAA33] hover:brightness-125"
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
