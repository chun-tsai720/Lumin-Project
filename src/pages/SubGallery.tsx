import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function SubGallery() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const currentId = id ? id.toLowerCase() : 'huan';
  const data = galleryData[currentId];

  // 核心修復：selectedPhoto 直接儲存完整的檔名路徑字串，徹底防止錯位
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    setSelectedPhoto(null);
  }, [currentId]);

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-sm tracking-widest text-zinc-500">GALLERY NOT FOUND</p>
        <button onClick={() => navigate('/real')} className="text-xs text-[#DDAA33] border-b border-[#DDAA33]">BACK TO TUNNEL</button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-400 font-sans relative select-none overflow-y-auto px-6 py-12">
      
      <header className="max-w-7xl mx-auto w-full flex justify-between items-center mb-16">
        <button onClick={() => navigate('/real')} className="text-xs tracking-[0.2em] text-zinc-500 hover:text-[#DDAA33] transition-colors">← BACK TO TUNNEL</button>
        <h1 className="text-2xl font-bold tracking-[0.2em] text-[#DDAA33] uppercase">{data.name} // REALITY</h1>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.files.map((filename) => (
          <motion.div
            key={filename}
            className="bg-zinc-950 border border-zinc-900 p-4 flex flex-col items-center cursor-pointer group"
            whileHover={{ y: -5 }}
            onClick={() => setSelectedPhoto(filename)}
          >
            <div className="w-full aspect-[3/4] overflow-hidden bg-zinc-900 mb-4">
              <img src={`/real/${currentId}/${filename}`} alt={filename} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <span className="text-[10px] tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors uppercase">{filename}</span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedPhoto(null)}
          >
            <figure className="max-w-[90vw] max-h-[85vh] overflow-hidden border border-zinc-900 bg-zinc-950">
              <img src={`/real/${currentId}/${selectedPhoto}`} alt="Expanded" className="w-full h-full object-contain" onClick={(e) => e.stopPropagation()} />
            </figure>
            <div className="mt-4 text-center" onClick={(e) => e.stopPropagation()}>
              <p className="text-xs tracking-[0.2em] text-[#DDAA33] font-mono m-0 uppercase">VIEWPORT // {selectedPhoto}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
