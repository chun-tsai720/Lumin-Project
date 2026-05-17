import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Lobby() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'transparent' }}
    >
      <h1 style={{ color: '#D4AF37', letterSpacing: '0.5rem', fontSize: '3rem', marginBottom: '1rem' }}>THE LOBBY</h1>
      <p style={{ color: '#D4AF37', marginBottom: '4rem' }}>SELECT YOUR PATH</p>

      <div style={{ display: 'flex', gap: '3rem' }}>
        {/* 實體入口 */}
        <motion.div 
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{ width: '250px', height: '400px', border: '1px solid #333', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)' }}
          onClick={() => navigate('/real')}
        >
          <h2 style={{ fontSize: '4rem', color: '#D4AF37' }}>實</h2>
          <p style={{ letterSpacing: '3px', opacity: 0.6 }}>REALITY</p>
        </motion.div>

        {/* 虛擬入口 */}
        <motion.div 
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
          style={{ width: '250px', height: '400px', border: '1px solid #333', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)' }}
          onClick={() => navigate('/virtual')}
        >
          <h2 style={{ fontSize: '4rem', color: '#D4AF37' }}>虛</h2>
          <p style={{ letterSpacing: '3px', opacity: 0.6 }}>VIRTUAL</p>
        </motion.div>
      </div>

      <button className="nav-btn" style={{ marginTop: '5rem', opacity: 0.6 }} onClick={() => navigate('/about')}>
        ← BACK TO INTRO
      </button>
    </motion.div>
  );
}