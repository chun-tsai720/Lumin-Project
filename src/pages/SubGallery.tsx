import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

// (💡 這裡保留原本的血汗抓取檔名字典檔，因篇幅省略，請務必保留在你的檔案頂部 💡)
const galleryData: Record<string, { name: string, files: string[] }> = {
  huan: { name: '幻', files: ['cover.jpg', ...Array.from({ length: 21 }, (_, i) => `huan${String(i + 1).padStart(2, '0')}.jpg`)] },
  heavy: { name: '重', files: ['cover.jpg', ...Array.from({ length: 17 }, (_, i) => `heavy${String(i + 1).padStart(2, '0')}.jpg`)] },
  ethereal: { name: '緲', files: ['cover.jpg', ...Array.from({ length: 9 }, (_, i) => `ethereal${String(i + 1).padStart(2, '0')}.jpg`)] },
  crush: { name: '壓', files: ['cover.jpg', ...Array.from({ length: 6 }, (_, i) => `crush${String(i + 1).padStart(2, '0')}.jpg`)] },
  haze: { name: '霧', files: ['cover.jpg', ...Array.from({ length: 53 }, (_, i) => `haze${String(i + 1).padStart(2, '0')}.jpg`)] },
};

export default function SubGallery() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // 💡 用來控制當前放大檢視的照片索引，確保 Lightbox 直接使用 galleryData 裡的實際檔名
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const collectionKey = id && galleryData[id] ? id : 'huan';
  const data = galleryData[collectionKey];
  const selectedPhotoFilename = selectedPhotoIndex !== null ? data.files[selectedPhotoIndex] : null;
  // public/real/{系列ID}/[實際檔名] 會由 Vite 以 /real/... 的公開路徑提供
  const selectedPhotoSrc = selectedPhotoFilename ? `/real/${collectionKey}/${selectedPhotoFilename}` : '';

  // 💡 監測專屬容器的滾動
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef
  });

  return (
    // 💡 外層容器：強制允許上下滾動 (就像 Tunnel 頁一樣)
    <div 
      ref={scrollContainerRef} 
      style={{ 
        width: '100vw', height: '100vh', 
        background: '#010101', // 極致黑背景
        overflowY: 'scroll', overflowX: 'hidden', 
        position: 'relative'
      }}
    >
      {/* 製造極長的滾動空間 (每張照片給 80vh 的行進距離) */}
      <div style={{ height: `${data.files.length * 80 + 100}vh`, width: '100%' }}>
        
        {/* 3D 攝影機舞臺：黏在螢幕上 */}
        <div style={{ 
          position: 'sticky', top: 0, 
          width: '100%', height: '100vh', 
          perspective: '1500px', // 💡 增強透視感
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          overflow: 'hidden'
        }}>
          
          {/* 固定標題與返回 */}
          <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
            <button className="nav-btn" onClick={() => navigate('/real')}>← BACK TO TUNNEL</button>
            <h1 style={{ color: '#D4AF37', fontSize: '3rem', marginTop: '1rem', letterSpacing: '10px' }}>
              {data.name}
            </h1>
            <p style={{ color: '#444', letterSpacing: '3px' }}>{data.files.length} WORKS</p>
          </div>

          {/* 💡 穿越作品隧道 */}
          {data.files.map((filename, index) => {
            const count = data.files.length;
            const segment = 1 / count;
            const focusPoint = index * segment;

            // Z 軸動畫：從深處 -2500 飛到眼前 0，再飛過頭 1500
            const z = useTransform(
              scrollYProgress,
              [focusPoint - segment, focusPoint, focusPoint + segment],
              [-2500, 0, 1500]
            );

            // 透明度動畫：靠近時最亮，遠離時淡出
            const opacity = useTransform(
              scrollYProgress,
              [focusPoint - segment * 0.7, focusPoint - segment * 0.1, focusPoint + segment * 0.1, focusPoint + segment * 0.7],
              [0, 1, 1, 0]
            );

            return (
              <motion.div
                key={filename}
                style={{ 
                    position: 'absolute', z, opacity, 
                    cursor: 'zoom-in', // 滑鼠樣式改為放大
                    transformStyle: 'preserve-3d'
                }}
                onClick={() => setSelectedPhotoIndex(index)} // 點擊設定放大照片索引
              >
                {/* 💡 作品框：去掉邊框，讓圖片更大，就像直接懸浮在牆上 */}
                <motion.div 
                    style={{
                        width: 'auto', // 寬度自適應
                        height: '65vh', // 💡 圖片放大：高度佔螢幕 65%
                        maxHeight: '600px', // 限制最大高度
                        background: '#111',
                        padding: '10px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                    whileHover={{ 
                        boxShadow: '0 0 30px rgba(212,175,55,0.3)',
                        borderColor: '#D4AF37'
                    }}
                >
                  <img 
                    src={`/real/${collectionKey}/${filename}`} 
                    alt="Artwork"
                    style={{ 
                        height: '100%', width: 'auto', 
                        objectFit: 'contain', // 確保完整顯示
                        display: 'block'
                    }}
                  />
                </motion.div>
                
                {/* 檔名微小標註 */}
                <p style={{ color: '#333', fontSize: '0.6rem', textAlign: 'center', marginTop: '10px', letterSpacing: '2px' }}>
                    {filename}
                </p>
              </motion.div>
            );
          })}

          <div style={{ position: 'absolute', bottom: '40px', opacity: 0.2, fontSize: '0.65rem', letterSpacing: '4px', color: '#fff' }}>
            SCROLL TO CHASE LIGHT
          </div>
        </div>
      </div>

      {/* 💡 放大觀賞模式 (Lightbox) */}
      <AnimatePresence>
        {selectedPhotoFilename && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // 點擊背景關閉
            onClick={() => setSelectedPhotoIndex(null)}
            style={{
              position: 'fixed', top: 0, left: 0,
              width: '100vw', height: '100vh',
              background: 'rgba(0,0,0,0.95)', // 深色遮罩
              backdropFilter: 'blur(10px)', // 毛玻璃效果
              zIndex: 9999, // 疊在最上層
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'zoom-out' // 滑鼠樣式改為縮小
            }}
          >
            <motion.img
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedPhotoSrc}
              alt="Maximized Artwork"
              style={{
                maxWidth: '90%', maxHeight: '90%', // 💡 全螢幕放大
                boxShadow: '0 0 50px rgba(212,175,55,0.2)',
                border: '1px solid rgba(212,175,55,0.1)'
              }}
            />
            
            {/* 提示文字 */}
            <div style={{ position: 'absolute', bottom: '30px', color: '#888', letterSpacing: '2px', fontSize: '0.8rem' }}>
              CLICK ANYWHERE TO CLOSE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}