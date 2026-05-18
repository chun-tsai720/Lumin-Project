import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-sm tracking-widest text-zinc-500">GALLERY NOT FOUND</p>
        <button onClick={() => navigate('/lobby')} className="text-xs text-[#DDAA33] border-b border-[#DDAA33]">BACK TO LOBBY</button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-400 font-sans relative overflow-x-hidden select-none">
      <header className="p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
        <button onClick={() => navigate('/lobby')} className="text-xs tracking-[0.2em] text-zinc-500 hover:text-[#DDAA33] transition-colors">← BACK TO LOBBY</button>
        <span className="text-[10px] tracking-[0.4em] text-zinc-600 font-light">LUMIN | 虛色數位策展空間</span>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center min-h-[calc(100vh-160px)]">
        <section className="lg:col-span-4 flex flex-col justify-center text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-[0.2em] text-[#DDAA33] mb-4 uppercase">{currentGallery.name}</h1>
          <p className="text-xs tracking-[0.3em] text-zinc-500 font-medium uppercase">{currentGallery.subtitle} / {currentGallery.totalSlices} SLICES</p>
        </section>

        <section className="lg:col-span-8 flex justify-center items-center">
          <div
            style={{ width: '450px', height: '450px' }}
            className="overflow-hidden bg-zinc-950 border border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.8)] cursor-pointer group relative"
            onClick={() => setSelectedPhoto(currentGallery.files[0])}
          >
            <img src={`/virtual/${currentId}/${currentGallery.files[0]}`} alt={currentGallery.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        </section>
      </div>

      <footer className="w-full text-center pb-8">
        <p className="text-[9px] tracking-[0.3em] text-zinc-600 font-light uppercase">CLICK IMAGE TO OPEN NEURAL VIEWPORT</p>
      </footer>

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/98 z-50 flex flex-col items-center justify-center p-12 transition-opacity duration-300" onClick={() => setSelectedPhoto(null)}>
          {/* 核心修正：大幅縮小圖片容器限制，增加優雅留白空間 */}
          <figure className="max-w-[65vw] max-h-[70vh] overflow-hidden relative border border-zinc-800 bg-zinc-950 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
            <img src={`/virtual/${currentId}/${selectedPhoto}`} alt="Expanded Neural Viewport" className="w-full h-full object-contain" onClick={(e) => e.stopPropagation()} />
          </figure>
          <div className="mt-6 text-center flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
            <span className="text-xs tracking-[0.2em] text-[#DDAA33] font-mono m-0 uppercase">VIEWPORT // {selectedPhoto.toUpperCase()}</span>
            <button onClick={() => setSelectedPhoto(null)} className="text-[10px] tracking-[0.3em] text-zinc-500 hover:text-white mt-2 transition-colors">TAP ANYWHERE TO CLOSE</button>
          </div>
        </div>
      )}
    </main>
  );
}
