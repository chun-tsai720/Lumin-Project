import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const virtualCollections = [
  { id: '1990', en: '1990', cover: 'cover.png' },
  { id: 'afternoon', en: 'AFTERNOON', cover: 'cover.png' },
  { id: 'angel-devil', en: 'ANGEL OR DEVIL', cover: 'cover.png' },
  { id: 'angel-war', en: 'ANGEL OF WAR', cover: 'cover.png' },
  { id: 'arch', en: 'ARCH', cover: 'cover.png' },
  { id: 'athena', en: 'ATHENA', cover: 'cover.png' },
  { id: 'blue', en: 'BLUE', cover: 'cover.png' },
  { id: 'burger', en: 'BURGER', cover: 'cover.png' },
  { id: 'dark-fashion', en: 'DARK FASHION', cover: 'cover.png' },
  { id: 'dream', en: 'DREAM', cover: 'cover.png' },
  { id: 'fashion', en: 'FASHION', cover: 'cover.png' },
  { id: 'flower', en: 'FLOWER', cover: 'cover.png' },
  { id: 'god-of-thunder', en: 'God Of Thunder', cover: 'cover.png' },
  { id: 'gothic', en: 'GOTHIC', cover: 'cover.png' },
  { id: 'hades', en: 'HADES', cover: 'cover.png' },
  { id: 'helen', en: 'HELEN', cover: 'cover.png' },
  { id: 'king-sea', en: 'King Of The Sea', cover: 'cover.png' },
  { id: 'odin', en: 'ODIN', cover: 'cover.png' },
  { id: 'orange-fashion', en: 'ORANGE FASHION', cover: 'cover.png' },
  { id: 'priest', en: 'PRIEST', cover: 'cover.png' },
  { id: 'red', en: 'RED', cover: 'cover.png' },
  { id: 'shiva', en: 'SHIVA', cover: 'cover.png' },
  { id: 'skull-fashion', en: 'Skull Fashion', cover: 'cover.png' },
  { id: 'steampunk-girl', en: 'STEAMPUNK GIRL', cover: 'cover.png' },
  { id: 'survive', en: 'SURVIVE', cover: 'cover.png' },
  { id: 'valkyrie', en: 'VALKYRIE', cover: 'cover.png' },
  { id: 'white', en: 'WHITE', cover: 'cover.png' }
];

export default function VirtualGalleryPage() {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);
  
  const angle = 360 / virtualCollections.length;
  const radius = 1800;

  const handleNext = () => setRotation(r => r - angle);
  const handlePrev = () => setRotation(r => r + angle);

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: '#010101', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      perspective: '2000px'
    }}>

      <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 100 }}>
        <button className="nav-btn" onClick={() => navigate('/lobby')}>← BACK TO LOBBY</button>
        <h1 style={{ color: '#D4AF37', fontSize: '2.2rem', marginTop: '1.2rem', letterSpacing: '12px', fontWeight: 300 }}>VIRTUAL</h1>
      </div>

      <div style={{ position: 'absolute', top: '50%', left: '4%', zIndex: 100, transform: 'translateY(-50%)' }}>
        <button className="nav-btn" style={{ padding: '25px 32px', fontSize: '1.2rem', borderRadius: '50%' }} onClick={handlePrev}>◀</button>
      </div>
      <div style={{ position: 'absolute', top: '50%', right: '4%', zIndex: 100, transform: 'translateY(-50%)' }}>
        <button className="nav-btn" style={{ padding: '25px 32px', fontSize: '1.2rem', borderRadius: '50%' }} onClick={handleNext}>▶</button>
      </div>

      <motion.div
        style={{ width: '320px', height: '480px', position: 'relative', transformStyle: 'preserve-3d' }}
        initial={{ z: -radius }}
        animate={{ z: -radius, rotateY: rotation }}
        transition={{ type: "tween", duration: 0.8, ease: "easeInOut" }}
      >
        {virtualCollections.map((item, index) => {
          const itemAngle = index * angle;
          return (
            <div
              key={item.id}
              style={{
                position: 'absolute', top: 0, left: 0,
                width: '100%', height: '100%',
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'hidden',
              }}
            >
              <motion.div
                style={{
                  width: '100%', height: '100%',
                  background: 'rgba(212, 175, 55, 0.02)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 0 60px rgba(0,0,0,0.6)',
                  borderRadius: '4px', padding: '12px',
                  display: 'flex', flexDirection: 'column',
                  cursor: 'pointer'
                }}
                whileHover={{ scale: 1.05, borderColor: '#00E5FF', boxShadow: '0 0 50px rgba(0,229,255,0.3)' }}
                onClick={() => navigate(`/virtual/${item.id}`)}
              >
                <div style={{ width: '100%', height: '75%', background: '#000', overflow: 'hidden', marginBottom: '15px' }}>
                  <img src={`/virtual/${item.id}/${item.cover}`} alt={item.en} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.1'; }} />
                </div>
                <div style={{ textAlign: 'center', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <h2 style={{ fontSize: '1.6rem', color: '#D4AF37', margin: 0, letterSpacing: '3px', fontWeight: 700, textTransform: 'uppercase' }}>
                    {item.en}
                  </h2>
                </div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      <div style={{ position: 'absolute', bottom: '40px', color: '#333', letterSpacing: '6px', fontSize: '0.7rem' }}>
        27 VIRTUAL ENTITIES REGISTERED
      </div>
    </div>
  );
}