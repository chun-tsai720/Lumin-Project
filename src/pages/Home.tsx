import { useNavigate } from 'react-router-dom';
import { WarpTransition } from '../components/ui/WarpTransition';

export default function Home() {
  const navigate = useNavigate();

  return (
    <WarpTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
        <div className="z-10 flex flex-col items-center w-full max-w-4xl">
          
          {/* Logo Placeholder */}
          <div className="w-64 h-64 md:w-80 md:h-80 mb-12 relative animate-fade-up animate-float">
            <div className="absolute inset-0 design-placeholder rounded-full z-0 opacity-80 backdrop-blur-md">
              <span className="badge-spline text-[10px] px-2 py-1 rounded border mb-2 uppercase tracking-widest">Spline 3D</span>
              <span>主視覺 3D Logo<br/>LUMIN Core</span>
            </div>
          </div>
          
          <div className="text-center animate-fade-up delay-100">
            <h1 className="text-6xl md:text-8xl font-light tracking-[0.4em] gold-text-gradient mb-6 ml-4">LUMIN</h1>
            <div className="flex items-center justify-center gap-4 mb-16">
              <div className="h-px w-12 bg-lumin-gold opacity-50"></div>
              <p className="text-lumin-gray tracking-[0.4em] text-sm uppercase">Digital Exhibition Space</p>
              <div className="h-px w-12 bg-lumin-gold opacity-50"></div>
            </div>
          </div>
          
          <div className="animate-fade-up delay-300">
            <button 
              onClick={() => navigate('/about')}
              className="btn-lumin"
            >
              Enter Space
            </button>
          </div>
        </div>
      </div>
    </WarpTransition>
  );
}
