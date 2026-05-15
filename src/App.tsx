import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CoverPage from './pages/CoverPage';
import IntroCard from './pages/IntroCard';
import Lobby from './pages/Lobby';

// 💡 匯入「實」展區組件
import RealGalleryPage from './pages/RealGalleryPage';
import SubGallery from './pages/SubGallery';

// 💡 匯入「虛」展區組件
import VirtualGalleryPage from './pages/VirtualGalleryPage';
import VirtualSubGallery from './pages/VirtualSubGallery';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 入口與關於頁面 */}
        <Route path="/" element={<CoverPage />} />
        <Route path="/about" element={<IntroCard />} />
        
        {/* 展覽總大廳 */}
        <Route path="/lobby" element={<Lobby />} />
        
        {/* -------------------------------------------------------
            【實 / REALITY】展區路徑
            ------------------------------------------------------- */}
        {/* 實體 3D 隧道大廳 */}
        <Route path="/real" element={<RealGalleryPage />} />
        {/* 實體 作品深入隧道展間 (動態 id，如 /real/huan) */}
        <Route path="/real/:id" element={<SubGallery />} />
        
        {/* -------------------------------------------------------
            【虛 / VIRTUAL】展區路徑
            ------------------------------------------------------- */}
        {/* 虛擬 3D 環狀旋轉大廳 */}
        <Route path="/virtual" element={<VirtualGalleryPage />} />
        {/* 虛擬 作品深入隧道展間 (動態 id，如 /virtual/angel-war) */}
        <Route path="/virtual/:id" element={<VirtualSubGallery />} />
      </Routes>
    </BrowserRouter>
  );
}