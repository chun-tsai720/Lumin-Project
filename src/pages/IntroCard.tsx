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
      {/* 調整中段間距為舒適的 100px */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '100px', maxWidth: '1200px', width: '100%', padding: '0 50px' }}>

        {/* 左側：精緻方形照片與名牌 */}
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
          {/* 照片縮小鎖定為 260px 正方形 */}
          <div style={{ width: '260px', height: '260px', overflow: 'hidden', backgroundColor: '#18181b', border: '1px solid #27272a', marginBottom: '32px' }}>
            <img
              src="/chun.jpg"
              alt="蔡濬守"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              className="grayscale opacity-90"
            />
          </div>

          {/* 字體比例：學號 14px，姓名 20px */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '14px', letterSpacing: '0.2em', color: '#a1a1aa' }}>91139127</div>
            <h1 style={{ fontSize: '20px', letterSpacing: '0.3em', color: '#ffffff', fontWeight: 500, margin: 0 }}>蔡濬守</h1>
          </div>
        </section>

        {/* 右側：介紹文字與框線按鈕 */}
        <section style={{ maxWidth: '460px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* 內文 15px，搭配 2.2 倍行高 */}
          <div style={{ fontSize: '15px', lineHeight: '2.2', letterSpacing: '0.15em', color: '#d4d4d8', marginBottom: '48px', fontWeight: 300, textAlign: 'justify' }}>
            <p style={{ marginBottom: '20px', margin: 0 }}>
              過去，我透過觀景窗捕捉光影的輪廓；<br />
              現在，我透過 Prompt 與程式碼生成未知的視界。
            </p>
            <p style={{ margin: 0, marginTop: '20px' }}>
              <span style={{ color: '#DDAA33' }}>《映光Lumin》</span> 不僅是一個作品集，這是我將實體的過往，解構並重組為「數位自我」的過渡儀式。
            </p>
          </div>

          {/* 按鈕區 */}
          <nav style={{ display: 'flex', gap: '20px' }}>
            <button
              style={{ padding: '12px 28px', fontSize: '12px', letterSpacing: '0.25em', color: '#71717a', border: '1px solid #27272a', backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 0.3s' }}
              onClick={() => handleNavigation('/')}
            >
              ← BACK TO COVER
            </button>
            <button
              style={{ padding: '12px 28px', fontSize: '12px', letterSpacing: '0.25em', color: '#DDAA33', border: '1px solid #27272a', backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 0.3s' }}
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
