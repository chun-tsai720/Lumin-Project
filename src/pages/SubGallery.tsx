import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, MotionValue, useScroll, useTransform } from 'framer-motion';

const galleryData: Record<string, { name: string; files: string[] }> = {
  huan: { name: '幻', files: ['cover.jpg', ...Array.from({ length: 21 }, (_, i) => `huan${String(i + 1).padStart(2, '0')}.jpg`)] },
  light: { name: '光', files: ['cover.jpg', ...Array.from({ length: 36 }, (_, i) => `light${String(i + 1).padStart(2, '0')}.jpg`)] },
  heavy: { name: '重', files: ['cover.jpg', ...Array.from({ length: 17 }, (_, i) => `heavy${String(i + 1).padStart(2, '0')}.jpg`)] },
  maze: { name: '迷', files: ['cover.jpg', ...Array.from({ length: 16 }, (_, i) => `maze${String(i + 1).padStart(2, '0')}.jpg`)] },
  reflect: { name: '映', files: ['cover.jpg'] },
  ethereal: { name: '渺', files: ['cover.jpg', ...Array.from({ length: 9 }, (_, i) => `ethereal${String(i + 1).padStart(2, '0')}.jpg`)] },
  shadow: { name: '影', files: ['cover.jpg', ...Array.from({ length: 36 }, (_, i) => `shadow${String(i + 1).padStart(2, '0')}.jpg`)] },
  still: { name: '靜', files: ['cover.jpg', ...Array.from({ length: 24 }, (_, i) => `stills${String(i + 1).padStart(2, '0')}.jpg`)] },
  crush: { name: '壓', files: ['cover.jpg', ...Array.from({ length: 6 }, (_, i) => `crush${String(i + 1).padStart(2, '0')}.jpg`)] },
  haze: { name: '霾', files: ['cover.jpg', ...Array.from({ length: 53 }, (_, i) => `haze${String(i + 1).padStart(2, '0')}.jpg`)] }
};

type GalleryCardProps = {
  filename: string;
  index: number;
  count: number;
  currentId: string;
  scrollYProgress: MotionValue<number>;
  onSelect: (filename: string) => void;
};

function GalleryCard({ filename, index, count, currentId, scrollYProgress, onSelect }: GalleryCardProps) {
  const segment = 1 / count;
  const focusPoint = index * segment;

  const z = useTransform(scrollYProgress, [focusPoint - segment, focusPoint, focusPoint + segment], [-3000, 0, 1200]);
  const opacity = useTransform(scrollYProgress, [focusPoint - segment * 0.7, focusPoint, focusPoint + segment * 0.7], [0, 1, 0]);
  const pointerEvents = useTransform(opacity, value => value > 0.1 ? 'auto' : 'none');

  return (
    <motion.div
      style={{ position: 'absolute', z, opacity, pointerEvents, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onSelect(filename)}
    >
      {/* 核心修正：鎖死卡片大小，絕不溢出 */}
      <div style={{ width: '400px', height: '530px', backgroundColor: '#09090b', border: '1px solid #1c1c1e', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}>
        <div style={{ width: '100%', height: '430px', overflow: 'hidden', backgroundColor: '#000' }}>
          <img src={`/real/${currentId}/${filename}`} alt={filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="grayscale hover:grayscale-0 transition-all duration-500" />
        </div>
        <span style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#52525b', marginTop: '20px', textTransform: 'uppercase' }}>{filename}</span>
      </div>
    </motion.div>
  );
}

export default function SubGallery() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const currentId = id ? id.toLowerCase() : 'huan';
  const data = galleryData[currentId];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    setSelectedPhoto(null);
  }, [currentId]);

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <button onClick={() => navigate('/real')} className="text-xs text-[#DDAA33]">BACK TO TUNNEL</button>
      </div>
    );
  }

  return (
    <div 
      ref={scrollContainerRef} 
      style={{ width: '100vw', height: '100vh', overflowY: 'scroll', overflowX: 'hidden', backgroundColor: '#050505', position: 'relative' }}
    >
      {/* 滾動長度軌道 */}
      <div style={{ height: `${data.files.length * 120}vh`, width: '100%' }}>
        
        {/* 3D 視角固定舞台 */}
        <div style={{ position: 'sticky', top: 0, width: '100vw', height: '100vh', perspective: '1500px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          
          {/* 左上角返回鍵 */}
          <div style={{ position: 'absolute', top: '48px', left: '48px', zIndex: 100 }}>
            <button onClick={() => navigate('/real')} style={{ background: 'transparent', border: 'none', color: '#71717a', fontSize: '13px', letterSpacing: '0.2em', cursor: 'pointer' }}>
              ← BACK TO TUNNEL
            </button>
            <h1 style={{ fontSize: '32px', letterSpacing: '0.2em', color: '#DDAA33', margin: '16px 0 0 0', textTransform: 'uppercase' }}>{data.name} // REALITY</h1>
          </div>

          {/* 3D Parallax 圖片卡片流 */}
          {data.files.map((filename, index) => (
            <GalleryCard
              key={filename}
              filename={filename}
              index={index}
              count={data.files.length}
              currentId={currentId}
              scrollYProgress={scrollYProgress}
              onSelect={setSelectedPhoto}
            />
          ))}

          <div style={{ position: 'absolute', bottom: '40px', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.3em', color: '#3f3f46' }}>
            SCROLL TO TRAVEL GALLERY
          </div>

        </div>
      </div>

      {/* 大圖彈窗 */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.98)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px', cursor: 'zoom-out' }}
            onClick={() => setSelectedPhoto(null)}
          >
            <figure style={{ maxWidth: '65vw', maxHeight: '70vh', overflow: 'hidden', border: '1px solid #27272a', backgroundColor: '#000', margin: 0, boxShadow: '0 0 80px rgba(0,0,0,0.9)' }}>
              <img src={`/real/${currentId}/${selectedPhoto}`} alt="Expanded" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onClick={(e) => e.stopPropagation()} />
            </figure>
            <div style={{ marginTop: '24px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
              <p style={{ fontSize: '13px', letterSpacing: '0.2em', color: '#DDAA33', fontFamily: 'monospace', margin: 0, textTransform: 'uppercase' }}>VIEWPORT // {selectedPhoto}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
