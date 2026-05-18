import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const galleryData: Record<string, { name: string; subtitle: string; totalSlices: number; files: string[] }> = {
  '1990': { name: '1990', subtitle: 'VIRTUAL ENTITY', totalSlices: 3, files: ['cover.png', '1.png', '2.png'] },
  'afternoon': { name: 'AFTERNOON', subtitle: 'VIRTUAL ENTITY', totalSlices: 3, files: ['cover.png', '1.png', '2.png'] },
  'angel-or-devil': { name: 'ANGEL OR DEVIL', subtitle: 'VIRTUAL ENTITY', totalSlices: 5, files: ['cover.png', '1.png', '2.png', '3.png', '4.png'] },
  'angel-of-war': { name: 'ANGEL OF WAR', subtitle: 'VIRTUAL ENTITY', totalSlices: 8, files: ['cover.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png'] },
  'arch': { name: 'ARCH', subtitle: 'VIRTUAL ENTITY', totalSlices: 4, files: ['cover.png', '1.png', '2.png', '3.png'] },
  'white': { name: 'WHITE', subtitle: 'VIRTUAL ENTITY', totalSlices: 9, files: ['cover.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png'] },
  'valkyrie': { name: 'VALKYRIE', subtitle: 'VIRTUAL ENTITY', totalSlices: 6, files: ['cover.png', '1.png', '2.png', '3.png', '4.png', '5.png'] }
};

export default function VirtualSubGallery() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const currentId = id ? id.toLowerCase() : '';
  const currentGallery = galleryData[currentId];

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    setSelectedPhoto(null);
  }, [currentId]);

  if (!currentGallery) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={() => navigate('/lobby')} style={{ color: '#DDAA33', background: 'transparent', border: 'none', cursor: 'pointer' }}>BACK TO LOBBY</button>
      </div>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#050505', display: 'flex', position: 'relative', overflow: 'hidden' }}>

      {/* 左側：強勢固定（Sticky）標題資訊欄，絕不跟著滾動 */}
      <section style={{ width: '35%', height: '100vh', position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px', flexShrink: 0, boxSizing: 'border-box', borderRight: '1px solid #141416' }}>
        <div>
          <button onClick={() => navigate('/lobby')} style={{ background: 'transparent', border: 'none', color: '#52525b', fontSize: '13px', letterSpacing: '0.2em', cursor: 'pointer', padding: 0 }}>
            ← BACK TO LOBBY
          </button>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', letterSpacing: '0.15em', color: '#DDAA33', margin: '40px 0 12px 0', textTransform: 'uppercase' }}>{currentGallery.name}</h1>
          <p style={{ fontSize: '12px', letterSpacing: '0.3em', color: '#71717a', margin: 0, textTransform: 'uppercase' }}>{currentGallery.subtitle} / {currentGallery.totalSlices} SLICES</p>
        </div>
        <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: '#3f3f46' }}>
          CLICK ANY ARTWORK TO OPEN VIEWPORT
        </div>
      </section>

      {/* 右側：完美平滑垂直滾動的作品畫廊區 */}
      <section style={{ width: '65%', height: '100vh', overflowY: 'auto', padding: '84px 120px', display: 'flex', flexDirection: 'column', gap: '80px', boxSizing: 'border-box' }}>
        {currentGallery.files.map((filename) => (
          <motion.div
            key={filename}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', cursor: 'pointer' }}
            whileHover={{ y: -6 }}
            onClick={() => setSelectedPhoto(filename)}
          >
            {/* 核心修正：強制鎖死大圖尺寸為 500px，杜絕滿版炸開 */}
            <div style={{ width: '500px', height: '500px', overflow: 'hidden', backgroundColor: '#0d0d0e', border: '1px solid #1c1c1e', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}>
              <img src={`/virtual/${currentId}/${filename}`} alt={filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <span style={{ fontSize: '11px', letterSpacing: '0.2s', color: '#4b5563', marginTop: '16px', fontFamily: 'monospace', textTransform: 'uppercase' }}>SLICE // {filename}</span>
          </motion.div>
        ))}
      </section>

      {/* 大圖彈窗 */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.98)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px', cursor: 'zoom-out' }}
            onClick={() => setSelectedPhoto(null)}
          >
            <figure style={{ maxWidth: '65vw', maxHeight: '70vh', overflow: 'hidden', border: '1px solid #27272a', backgroundColor: '#000', margin: 0, boxShadow: '0 0 80px rgba(0,0,0,0.9)' }}>
              <img src={`/virtual/${currentId}/${selectedPhoto}`} alt="Expanded" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onClick={(e) => e.stopPropagation()} />
            </figure>
            <div style={{ marginTop: '24px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
              <span style={{ fontSize: '13px', letterSpacing: '0.2em', color: '#DDAA33', fontFamily: 'monospace', textTransform: 'uppercase' }}>VIEWPORT // {selectedPhoto.toUpperCase()}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
