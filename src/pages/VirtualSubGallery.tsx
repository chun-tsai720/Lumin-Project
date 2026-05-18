import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// 自動生成檔名函數：依照真實資料夾命名 (不補 0)，cover.png 排第一位
const autoGenFiles = (prefix: string, count: number, ext: string = 'png', hasCover: boolean = true) => {
  const files = hasCover ? ['cover.png'] : [];
  for (let i = 1; i <= count; i++) {
    files.push(`${prefix}${i}.${ext}`);
  }
  return files;
};

// 💎 濬老闆的 27 展間完整資料庫
const galleryData: Record<string, { name: string; subtitle: string; files: string[] }> = {
  'god-of-thunder': { name: 'GOD OF THUNDER', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('god-of-thunder', 6) },
  '1990': { name: '1990', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('1990', 2) },
  'afternoon': { name: 'AFTERNOON', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('afternoon', 2) },
  'angel-devil': { name: 'ANGEL DEVIL', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('angel-devil', 4) },
  'angel-war': { name: 'ANGEL WAR', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('angel-war', 7) },
  'arch': { name: 'ARCH', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('arch', 5) },
  'athena': { name: 'ATHENA', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('athena', 7) },
  'blue': { name: 'BLUE', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('blue', 6) },
  'burger': { name: 'BURGER', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('burger', 2) },
  'dark-fashion': { name: 'DARK FASHION', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('dark-fashion', 9) },
  'dream': { name: 'DREAM', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('dream', 1) },
  'fashion': { name: 'FASHION', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('fashion', 3) },
  'flower': { name: 'FLOWER', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('flower', 2) },
  'gothic': { name: 'GOTHIC', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('gothic', 8) },
  'hades': { name: 'HADES', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('hades', 5) },
  'helen': { name: 'HELEN', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('helen', 10) },
  'king-sea': { name: 'KING SEA', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('king-sea', 9) },
  'odin': { name: 'ODIN', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('odin', 4) },
  'orange-fashion': { name: 'ORANGE FASHION', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('orange-fashion', 8) },
  'priest': { name: 'PRIEST', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('priest', 6) },
  'red': { name: 'RED', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('red', 8) },
  'shiva': { name: 'SHIVA', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('shiva', 8) },
  'skull-fashion': { name: 'SKULL FASHION', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('skull-fashion', 10) },
  'steampunk-girl': { name: 'STEAMPUNK GIRL', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('steampunk-girl', 5) },
  'survive': { name: 'SURVIVE', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('survive', 5) },
  // 依據早前截圖，valkyrie 無 cover.png，若後續有加上可將 false 刪除
  'valkyrie': { name: 'VALKYRIE', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('valkyrie', 2, 'png', false) },
  'white': { name: 'WHITE', subtitle: 'VIRTUAL ENTITY', files: autoGenFiles('white', 8) }
};

export default function VirtualSubGallery() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const currentId = id ? id.toLowerCase() : '';
  const currentGallery = galleryData[currentId];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    setSelectedPhoto(null);
  }, [currentId]);

  if (!currentGallery) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={() => navigate('/lobby')} style={{ color: '#DDAA33', background: 'transparent', border: 'none', cursor: 'pointer', letterSpacing: '0.2em' }}>BACK TO LOBBY</button>
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      style={{ width: '100vw', height: '100vh', overflowY: 'scroll', overflowX: 'hidden', backgroundColor: '#050505', position: 'relative' }}
    >
      {/* 依據照片數量動態生成滾動軌道長度 */}
      <div style={{ height: `${currentGallery.files.length * 150}vh`, width: '100%' }}>

        {/* 3D 固定舞台 */}
        <div style={{ position: 'sticky', top: 0, width: '100vw', height: '100vh', perspective: '1500px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

          {/* 左上角返回鍵與標題 */}
          <div style={{ position: 'absolute', top: '48px', left: '48px', zIndex: 100 }}>
            <button onClick={() => navigate('/lobby')} style={{ background: 'transparent', border: 'none', color: '#52525b', fontSize: '13px', letterSpacing: '0.2em', cursor: 'pointer', padding: 0 }}>
              ← BACK TO LOBBY
            </button>
            <h1 style={{ fontSize: '42px', fontWeight: 'bold', letterSpacing: '0.2em', color: '#DDAA33', margin: '20px 0 8px 0', textTransform: 'uppercase' }}>{currentGallery.name}</h1>
            <p style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#71717a', margin: 0 }}>{currentGallery.subtitle} // {currentGallery.files.length} SLICES</p>
          </div>

          {/* 3D 隧道卡片映射 */}
          {currentGallery.files.map((filename, index) => {
            const count = currentGallery.files.length;
            const segment = 1 / count;
            const focusPoint = index * segment;

            const z = useTransform(scrollYProgress, [focusPoint - segment, focusPoint, focusPoint + segment], [-3000, 0, 1200]);
            const opacity = useTransform(scrollYProgress, [focusPoint - segment * 0.7, focusPoint, focusPoint + segment * 0.7], [0, 1, 0]);
            const pointerEvents = useTransform(opacity, value => value > 0.1 ? 'auto' : 'none');

            return (
              <motion.div
                key={filename}
                style={{ position: 'absolute', z, opacity, pointerEvents, transformStyle: 'preserve-3d' }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedPhoto(filename)}
              >
                <div style={{ width: '420px', height: '540px', backgroundColor: '#09090b', border: '1px solid #1c1c1e', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.8)', cursor: 'pointer' }}>
                  <div style={{ width: '100%', height: '440px', overflow: 'hidden', backgroundColor: '#000' }}>
                    <img
                      src={`/virtual/${currentId}/${filename}`}
                      alt={filename}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      className="grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <span style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#52525b', marginTop: '20px', textTransform: 'uppercase', fontFamily: 'monospace' }}>{filename}</span>
                </div>
              </motion.div>
            );
          })}

          <div style={{ position: 'absolute', bottom: '40px', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.4em', color: '#3f3f46' }}>
            SCROLL TO NAVIGATE NEURAL NETWORK
          </div>

        </div>
      </div>

      {/* 大圖彈窗 (65vw 留白比例) */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.98)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px', cursor: 'zoom-out' }}
            onClick={() => setSelectedPhoto(null)}
          >
            <figure style={{ maxWidth: '65vw', maxHeight: '70vh', overflow: 'hidden', border: '1px solid #27272a', backgroundColor: '#000', margin: 0, boxShadow: '0 0 80px rgba(0,0,0,0.9)' }}>
              <img src={`/virtual/${currentId}/${selectedPhoto}`} alt="Expanded Viewport" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onClick={(e) => e.stopPropagation()} />
            </figure>
            <div style={{ marginTop: '24px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
              <p style={{ fontSize: '13px', letterSpacing: '0.2em', color: '#DDAA33', fontFamily: 'monospace', margin: 0, textTransform: 'uppercase' }}>VIEWPORT // {selectedPhoto}</p>
              <p style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#52525b', marginTop: '10px' }}>CLICK ANYWHERE TO EXIT</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
