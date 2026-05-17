import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// 💡 總監已經幫你把「策展人精選封面」全部換好了
const collections = [
  { id: 'huan', name: '幻', en: 'ILLUSION', cover: 'cover.jpg' },
  { id: 'light', name: '光', en: 'GLOW', cover: 'cover.jpg' },
  { id: 'heavy', name: '重', en: 'GRAVITY', cover: 'cover.jpg' },
  { id: 'maze', name: '迷', en: 'MAZE', cover: 'cover.jpg' },
  { id: 'reflect', name: '絮', en: 'REFLECT', cover: 'cover.jpg' },
  { id: 'ethereal', name: '緲', en: 'ETHEREAL', cover: 'cover.jpg' },
  { id: 'shadow', name: '影', en: 'TRACE', cover: 'cover.jpg' },
  { id: 'still', name: '靜', en: 'SILENCE', cover: 'cover.jpg' },
  { id: 'crush', name: '壓', en: 'PRESSURE', cover: 'cover.jpg' },
  { id: 'haze', name: '霧', en: 'MIST', cover: 'cover.jpg' }
];

export default function RealGalleryPage() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });

  return (
    <div ref={scrollContainerRef} style={{ width: '100vw', height: '100vh', background: '#050505', overflowY: 'scroll', overflowX: 'hidden', position: 'relative' }}>
      <div style={{ height: '1000vh', width: '100%' }}>
        <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', perspective: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          
          <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 100 }}>
            <button className="nav-btn" onClick={() => navigate('/lobby')}>← BACK TO LOBBY</button>
          </div>

          {collections.map((item, index) => {
            const count = collections.length;
            const segment = 1 / count;
            const focusPoint = index * segment;

            const startZ = (index === 0) ? 0 : -3000;
            const z = useTransform(
              scrollYProgress,
              [focusPoint - segment, focusPoint, focusPoint + segment],
              [startZ, 0, 1500]
            );

            const startOpacity = (index === 0) ? 1 : 0;
            const opacity = useTransform(
              scrollYProgress,
              [focusPoint - segment * 0.5, focusPoint, focusPoint + segment * 0.5],
              [startOpacity, 1, 0]
            );
            const pointerEvents = useTransform(opacity, value => value > 0.1 ? 'auto' : 'none');

            return (
              <motion.div
                key={item.id}
                style={{ position: 'absolute', z, opacity, pointerEvents, cursor: 'pointer' }}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(`/real/${item.id}`)}
              >
                <div style={{ width: '320px', height: '500px', background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.2)', backdropFilter: 'blur(15px)', borderRadius: '5px', padding: '15px', display: 'flex', flexDirection: 'column', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}>
                  <div style={{ width: '100%', height: '70%', background: '#111', marginBottom: '20px', overflow: 'hidden' }}>
                    <img 
                      src={`/real/${item.id}/${item.cover}`} 
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }}
                    />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '4.5rem', color: '#D4AF37', margin: 0, lineHeight: 1 }}>{item.name}</h2>
                    <p style={{ letterSpacing: '8px', fontSize: '0.65rem', color: '#888', marginTop: '10px' }}>{item.en}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          <div style={{ position: 'absolute', bottom: '40px', opacity: 0.3, fontSize: '0.7rem', letterSpacing: '4px' }}>
            USE TRACKPAD TO TRAVEL
          </div>
        </div>
      </div>
    </div>
  );
}