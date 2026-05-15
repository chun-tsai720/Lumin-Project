import { useNavigate } from 'react-router-dom';
import { WarpTransition } from '../components/ui/WarpTransition';

export default function About() {
  const navigate = useNavigate();

  return (
    <WarpTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 relative">
        {/* 裝飾文字 */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-lumin-gray opacity-20 tracking-[0.5em] text-sm hidden lg:block">
            AUTHOR INTRODUCTION
        </div>

        <div className="w-full max-w-6xl glass-panel rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row gap-16 items-center animate-fade-up">
            <div className="w-full lg:w-5/12">
                <div className="aspect-[4/5] design-placeholder rounded-2xl w-full">
                    <span className="badge-spline text-[10px] px-2 py-1 rounded border mb-2 uppercase tracking-widest">Spline 3D</span>
                    <span className="text-lg mb-2 text-lumin-gold">Author Avatar / Concept</span>
                    <span className="text-xs opacity-70">3D 互動形象與懸浮幾何</span>
                </div>
            </div>
            
            <div className="w-full lg:w-7/12 flex flex-col items-start">
                <h2 className="text-4xl md:text-5xl font-light tracking-[0.2em] gold-text-gradient mb-4">作者介紹</h2>
                <p className="text-lumin-goldlight tracking-widest text-sm mb-10 opacity-70 uppercase">About The Creator</p>
                
                <div className="space-y-6 text-gray-300 leading-relaxed font-light text-lg mb-10">
                    <p>歡迎來到 LUMIN 數位策展空間。我們透過數位維度重新定義觀展體驗。</p>
                    <p>以「黑與金」為核心視覺，我們試圖在深邃無垠的虛擬網格中，捕捉實體存在的珍貴光芒。這裡不僅是作品的容器，更是連結「實」與「虛」的橋樑。</p>
                </div>
                
                <div className="flex flex-wrap gap-6">
                    <button onClick={() => navigate('/')} className="btn-lumin !bg-transparent !border-lumin-gray !text-lumin-gray hover:!border-white hover:!text-white">Return</button>
                    <button onClick={() => navigate('/lobby')} className="btn-lumin">Explore The Lobby</button>
                </div>
            </div>
        </div>
      </div>
    </WarpTransition>
  );
}
