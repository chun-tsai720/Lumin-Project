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
      {/* 內襯 padding 與中段間距 gap 放大 2.5 倍（gap: 200px, padding: 0 100px） */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '200px', maxWidth: '2500px', width: '100%', padding: '0 100px' }}>

        {/* 左側：放大 2.5 倍的方形照片與名牌 */}
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
          {/* 照片正方形尺寸：從 180px 乘以 2.5 倍，強制鎖死為 450px！邊框同步加粗至 3px */}
          <div style={{ width: '450px', height: '450px', overflow: 'hidden', backgroundColor: '#18181b', border: '3px solid #27272a', marginBottom: '60px' }}>
            <img
              src="/chun.jpg"
              alt="蔡濬守"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              className="grayscale opacity-90"
            />
          </div>

          {/* 文字與垂直間距放大 2.5 倍：學號放大至 32px，姓名放大至 40px，間距 15px */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ fontSize: '32px', letterSpacing: '0.2em', color: '#a1a1aa' }}>91139127</div>
            <h1 style={{ fontSize: '40px', letterSpacing: '0.3em', color: '#ffffff', fontWeight: 500, margin: 0 }}>蔡濬守</h1>
          </div>
        </section>

        {/* 右側：放大 2.5 倍的介紹文字與框線按鈕 */}
        <section style={{ maxWidth: '1050px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* 介紹內文：字體放大至 32px，行高保持 2.2 倍黃金比例，段落間距放大至 40px */}
          <div style={{ fontSize: '32px', lineHeight: '2.2', letterSpacing: '0.15em', color: '#d4d4d8', marginBottom: '100px', fontWeight: 300, textAlign: 'justify' }}>
            <p style={{ marginBottom: '40px', margin: 0 }}>
              過去，我透過觀景窗捕捉光影的輪廓；<br />
              現在，我透過 Prompt 與程式碼生成未知的視界。
            </p>
            <p style={{ margin: 0, marginTop: '40px' }}>
              <span style={{ color: '#DDAA33' }}>《映光Lumin》</span> 不僅是一個作品集，這是我將實體的過往，解構並重組為「數位自我」的過渡儀式。
            </p>
          </div>

          {/* 按鈕區放大 2.5 倍：按鈕間距 40px，內襯放大至 25px 50px，字體放大至 28px，邊框 3px */}
          <nav style={{ display: 'flex', gap: '40px' }}>
            <button
              style={{ padding: '25px 50px', fontSize: '28px', letterSpacing: '0.25em', color: '#71717a', border: '3px solid #27272a', backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 0.3s' }}
              onClick={() => handleNavigation('/')}
            >
              ← BACK TO COVER
            </button>
            <button
              style={{ padding: '25px 50px', fontSize: '28px', letterSpacing: '0.25em', color: '#DDAA33', border: '3px solid #27272a', backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 0.3s' }}
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
