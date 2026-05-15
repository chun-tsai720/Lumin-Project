import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

// 💡 總監校對：精準寫入你提供的所有張數 (不含 cover)
const virtualData: Record<string, { en: string, count: number }> = {
  '1990': { en: '1990', count: 2 },
  'afternoon': { en: 'AFTERNOON', count: 2 },
  'angel-devil': { en: 'Angel Or Devil', count: 4 },
  'angel-war': { en: 'Angel Of War', count: 7 },
  'arch': { en: 'ARCH', count: 5 },
  'athena': { en: 'ATHENA', count: 7 },
  'blue': { en: 'BLUE', count: 6 },
  'burger': { en: 'BURGER', count: 2 },
  'dark-fashion': { en: 'DARK FASHION', count: 10 },
  'dream': { en: 'DREAM', count: 1 },
  'fashion': { en: 'FASHION', count: 3 },
  'flower': { en: 'FLOWER', count: 2 },
  'god-of-thunder': { en: 'God Of Thunder', count: 6 },
  'gothic': { en: 'GOTHIC', count: 8 },
  'hades': { en: 'HADES', count: 5 },
  'helen': { en: 'HELEN', count: 10 },
  'king-sea': { en: 'King Of The Sea', count: 9 },
  'odin': { en: 'ODIN', count: 4 },
  'orange-fashion': { en: 'ORANGE FASHION', count: 8 },
  'priest': { en: 'PRIEST', count: 6 },
  'red': { en: 'RED', count: 8 },
  'shiva': { en: 'SHIVA', count: 8 },
  'skull-fashion': { en: 'Skull Fashion', count: 10 },
  'steampunk-girl': { en: 'STEAMPUNK GIRL', count: 5 },
  'survive': { en: 'SURVIVE', count: 5 },
  'valkyrie': { en: 'VALKYRIE', count: 2 },
  'white': { en: 'WHITE', count: 8 }
};

export default function VirtualSubGallery() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const collectionKey = id && virtualData[id] ? id : '1990';
  const data = virtualData[collectionKey];

  // 💡 把 cover.png 強制加到陣列的「第一張」，後面接著排數字檔名
  const photoFiles = [
    'cover.png',
    ...Array.from({ length: data.count }).map((_, index) => `${collectionKey}${index + 1}.png`)
  ];
  
  const totalFiles = photoFiles.length; // 總長度 = 張數 + 1 (cover)

  const { scrollYProgress } = useScroll({ container: scrollContainerRef });

  return (
    <div ref={scrollContainerRef} style={{ width: '100vw', height: '100vh', background: '#020205', overflowY: 'scroll', overflowX: 'hidden', position: 'relative' }}>
      <div style={{ height: `${totalFiles * 80 + 100}vh`, width: '100%' }}>
        <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', perspective: '1500px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          
          <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
            <button className="nav-btn" onClick={() => navigate('/virtual')}>← BACK TO CORE</button>
            <h1 style={{ color: '#D4AF37', fontSize: '2.5rem', marginTop: '1rem', letterSpacing: '8px', textTransform: 'uppercase' }}>{data.en}</h1>
            <p style={{ color: '#00E5FF', letterSpacing: '4px', opacity: 0.5 }}>VIRTUAL ENTITY / {totalFiles} SLICES</p>
          </div>

          {photoFiles.map((filename, index) => {
            const segment = 1 / totalFiles;
            const focusPoint = index * segment;

            const z = useTransform(scrollYProgress, [focusPoint - segment, focusPoint, focusPoint + segment], [-2800, 0, 1600]);
            const opacity = useTransform(scrollYProgress, [focusPoint - segment * 0.7, focusPoint - segment * 0.1, focusPoint + segment * 0.1, focusPoint + segment * 0.7], [0, 1, 1, 0]);

            return (
              <motion.div key={filename} style={{ position: 'absolute', z, opacity, cursor: 'zoom-in', transformStyle: 'preserve-3d' }} onClick={() => setSelectedPhoto(filename)}>
                <motion.div style={{ width: 'auto', height: '68vh', maxHeight: '650px', background: '#050508', padding: '10px', boxShadow: '0 0 60px rgba(0, 229, 255, 0.15)', border: '1px solid rgba(0, 229, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} whileHover={{ boxShadow: '0 0 40px rgba(212,175,55,0.4)', borderColor: '#D4AF37' }}>
                  <img src={`/virtual/${collectionKey}/${filename}`} alt="AI Artwork" style={{ height: '100%', width: 'auto', display: 'block' }} onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.1'; }} />
                </motion.div>
                <p style={{ color: '#00E5FF', fontSize: '0.6rem', textAlign: 'center', marginTop: '12px', letterSpacing: '4px', opacity: 0.4 }}>ID: {filename.toUpperCase()}</p>
              </motion.div>
            );
          })}

          <div style={{ position: 'absolute', bottom: '40px', opacity: 0.2, fontSize: '0.65rem', letterSpacing: '5px', color: '#fff' }}>
            SCROLL TO NAVIGATE NEURAL NETWORK
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPhoto(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,2,5,0.98)', backdropFilter: 'blur(15px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}>
            <motion.img initial={{ scale: 0.8, rotateY: 20 }} animate={{ scale: 1, rotateY: 0 }} exit={{ scale: 0.8, rotateY: -20 }} transition={{ type: "spring", damping: 25, stiffness: 200 }} src={`/virtual/${collectionKey}/${selectedPhoto}`} alt="Full Detail" style={{ maxWidth: '92%', maxHeight: '92%', boxShadow: '0 0 100px rgba(0, 229, 255, 0.2)', border: '1px solid rgba(0, 229, 255, 0.3)' }} />
            <div style={{ position: 'absolute', bottom: '30px', color: '#555', letterSpacing: '3px', fontSize: '0.8rem' }}>TAP TO EXIT VIEWPORT</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}