import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

// 💡 總監校對：每個系列都以 cover.png 作為第一張，後面接不補零的 PNG 流水號檔名
const galleryData: Record<string, { name: string, files: string[] }> = {
  '1990': { name: '1990', files: ['cover.png', ...Array.from({ length: 2 }, (_, i) => `1990${i + 1}.png`)] },
  'afternoon': { name: 'Afternoon', files: ['cover.png', ...Array.from({ length: 2 }, (_, i) => `afternoon${i + 1}.png`)] },
  'angel-devil': { name: 'ANGEL OR DEVIL', files: ['cover.png', ...Array.from({ length: 4 }, (_, i) => `angel-devil${i + 1}.png`)] },
  'angel-war': { name: 'ANGEL OF WAR', files: ['cover.png', ...Array.from({ length: 7 }, (_, i) => `angel-war${i + 1}.png`)] },
  'arch': { name: 'Arch', files: ['cover.png', ...Array.from({ length: 5 }, (_, i) => `arch${i + 1}.png`)] },
  'athena': { name: 'Athena', files: ['cover.png', ...Array.from({ length: 7 }, (_, i) => `athena${i + 1}.png`)] },
  'blue': { name: 'Blue', files: ['cover.png', ...Array.from({ length: 6 }, (_, i) => `blue${i + 1}.png`)] },
  'burger': { name: 'Burger', files: ['cover.png', ...Array.from({ length: 2 }, (_, i) => `burger${i + 1}.png`)] },
  'dark-fashion': { name: 'Dark Fashion', files: ['cover.png', ...Array.from({ length: 10 }, (_, i) => `dark-fashion${i + 1}.png`)] },
  'dream': { name: 'Dream', files: ['cover.png', ...Array.from({ length: 1 }, (_, i) => `deram${i + 1}.png`)] },
  'fashion': { name: 'Fashion', files: ['cover.png', ...Array.from({ length: 3 }, (_, i) => `fashion${i + 1}.png`)] },
  'flower': { name: 'Flower', files: ['cover.png', ...Array.from({ length: 2 }, (_, i) => `flower${i + 1}.png`)] },
  'god-of-thunder': { name: 'God Of Thunder', files: ['cover.png', ...Array.from({ length: 6 }, (_, i) => `god-of-thunder${i + 1}.png`)] },
  'gothic': { name: 'Gothic', files: ['cover.png', ...Array.from({ length: 8 }, (_, i) => `gothic${i + 1}.png`)] },
  'hades': { name: 'Hades', files: ['cover.png', ...Array.from({ length: 5 }, (_, i) => `hades${i + 1}.png`)] },
  'helen': { name: 'Helen', files: ['cover.png', ...Array.from({ length: 10 }, (_, i) => `helen${i + 1}.png`)] },
  'king-sea': { name: 'King Of The Sea', files: ['cover.png', ...Array.from({ length: 9 }, (_, i) => `king-sea${i + 1}.png`)] },
  'odin': { name: 'Odin', files: ['cover.png', ...Array.from({ length: 4 }, (_, i) => `odin${i + 1}.png`)] },
  'orange-fashion': { name: 'Orange Fashion', files: ['cover.png', ...Array.from({ length: 8 }, (_, i) => `orange-fashion${i + 1}.png`)] },
  'priest': { name: 'Priest', files: ['cover.png', ...Array.from({ length: 6 }, (_, i) => `priest${i + 1}.png`)] },
  'red': { name: 'Red', files: ['cover.png', ...Array.from({ length: 8 }, (_, i) => `red${i + 1}.png`)] },
  'shiva': { name: 'Shiva', files: ['cover.png', ...Array.from({ length: 8 }, (_, i) => `shiva${i + 1}.png`)] },
  'skull-fashion': { name: 'Skull Fashion', files: ['cover.png', ...Array.from({ length: 10 }, (_, i) => `skull-fashion${i + 1}.png`)] },
  'steampunk-girl': { name: 'Steampunk Girl', files: ['cover.png', ...Array.from({ length: 5 }, (_, i) => `steampunk-girl${i + 1}.png`)] },
  'survive': { name: 'Survive', files: ['cover.png', ...Array.from({ length: 5 }, (_, i) => `survive${i + 1}.png`)] },
  'valkyrie': { name: 'Valkyrie', files: ['cover.png', ...Array.from({ length: 2 }, (_, i) => `valkyrie${i + 1}.png`)] },
  'white': { name: 'White', files: ['cover.png', ...Array.from({ length: 8 }, (_, i) => `white${i + 1}.png`)] },
};

export default function VirtualSubGallery() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const collectionKey = id && galleryData[id] ? id : '1990';
  const data = galleryData[collectionKey];
  const photoFiles = data.files;
  
  const totalFiles = photoFiles.length; // 總長度 = 張數 + 1 (cover)

  const { scrollYProgress } = useScroll({ container: scrollContainerRef });

  return (
    <div ref={scrollContainerRef} style={{ width: '100vw', height: '100vh', background: '#020205', overflowY: 'scroll', overflowX: 'hidden', position: 'relative' }}>
      <div style={{ height: `${totalFiles * 80 + 100}vh`, width: '100%' }}>
        <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', perspective: '1500px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          
          <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
            <button className="nav-btn" onClick={() => navigate('/virtual')}>← BACK TO CORE</button>
            <h1 style={{ color: '#D4AF37', fontSize: '2.5rem', marginTop: '1rem', letterSpacing: '8px', textTransform: 'uppercase' }}>{data.name}</h1>
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