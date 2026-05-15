import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

// (💡 這裡保留原本的血汗抓取檔名字典檔，因篇幅省略，請務必保留在你的檔案頂部 💡)
const galleryData: Record<string, { name: string, files: string[] }> = {
  crush: { name: '壓', files: ['crush288.jpg', 'crush405.jpg', 'crush406.jpg', 'crush473.jpg', 'crush545.jpg', 'crush552.jpg', 'crush592.jpg'] },
  ethereal: { name: '輕', files: ['ethereal096.jpg', 'ethereal129.jpg', 'ethereal151.jpg', 'ethereal161.jpg', 'ethereal207.jpg', 'ethereal271.jpg', 'ethereal278.jpg', 'ethereal291.jpg', 'ethereal308.jpg', 'ethereal319.jpg'] },
  haze: { name: '霧', files: ['haze003.jpg', 'haze014.jpg', 'haze016.jpg', 'haze018.jpg', 'haze020.jpg', 'haze030.jpg', 'haze046.jpg', 'haze061.jpg', 'haze066.jpg', 'haze071.jpg', 'haze073.jpg', 'haze076.jpg', 'haze083.jpg', 'haze084.jpg', 'haze092.jpg', 'haze094.jpg', 'haze096.jpg', 'haze102.jpg', 'haze107.jpg', 'haze111.jpg', 'haze114.jpg', 'haze118.jpg', 'haze119.jpg', 'haze126.jpg', 'haze134.jpg', 'haze137.jpg', 'haze144.jpg', 'haze145.jpg', 'haze147.jpg', 'haze159.jpg', 'haze162.jpg', 'haze163.jpg', 'haze168.jpg', 'haze177.jpg', 'haze187.jpg', 'haze188.jpg', 'haze191.jpg', 'haze192.jpg', 'haze198.jpg', 'haze205.jpg', 'haze206.jpg', 'haze210.jpg', 'haze211.jpg', 'haze214.jpg', 'haze216.jpg', 'haze221.jpg', 'haze229.jpg', 'haze235.jpg', 'haze240.jpg', 'haze254.jpg', 'haze255.jpg', 'haze256.jpg', 'haze258.jpg', 'haze259.jpg'] },
  heavy: { name: '重', files: ['heavy1994.jpg', 'heavy2012.jpg', 'heavy2013.jpg', 'heavy2019.jpg', 'heavy2024.jpg', 'heavy2026.jpg', 'heavy2033.jpg', 'heavy2043.jpg', 'heavy2053.jpg', 'heavy2064.jpg', 'heavy2076.jpg', 'heavy2095.jpg', 'heavy2100.jpg', 'heavy2113.jpg', 'heavy2119.jpg', 'heavy2120.jpg', 'heavy2124.jpg', 'heavy2139.jpg'] },
  huan: { name: '幻', files: ['huan5538.jpg', 'huan5552.jpg', 'huan5648.jpg', 'huan5649.jpg', 'huan5650.jpg', 'huan5651.jpg', 'huan5667.jpg', 'huan5707.jpg', 'huan5714.jpg', 'huan5715.jpg', 'huan5725.jpg', 'huan5743.jpg', 'huan5754.jpg', 'huan5759.jpg', 'huan5780.jpg', 'huan5809.jpg', 'huan5810.jpg', 'huan5842.jpg', 'huan5860.jpg', 'huan5872.jpg', 'huan5888.jpg', 'huan5909.jpg'] },
  light: { name: '光', files: ['light685.jpg', 'light692.jpg', 'light732.jpg', 'light735.jpg', 'light765.jpg', 'light774.jpg', 'light779.jpg', 'light780.jpg', 'light814.jpg', 'light821.jpg', 'light822.jpg', 'light829.jpg', 'light831.jpg', 'light832.jpg', 'light834.jpg', 'light846.jpg', 'light854.jpg', 'light857.jpg', 'light867.jpg', 'light883.jpg', 'light897.jpg', 'light909.jpg', 'light913.jpg', 'light971.jpg', 'light974.jpg', 'light984.jpg', 'light990.jpg', 'light8016.jpg', 'light8026.jpg', 'light9035.jpg', 'light9050.jpg', 'light9053.jpg', 'light9060.jpg', 'light9133.jpg', 'light9160.jpg', 'light9226.jpg'] },
  maze: { name: '迷', files: ['maze11072.jpg', 'maze11136.jpg', 'maze11140.jpg', 'maze11141.jpg', 'maze11143.jpg', 'maze11236.jpg', 'maze11271.jpg', 'maze11345.jpg', 'maze11363.jpg', 'maze11411.jpg', 'maze11464.jpg', 'maze11549.jpg', 'maze11563.jpg', 'maze11192111.jpg', 'maze114061111.jpg', 'maze114521111.jpg', 'maze114741111.jpg'] },
  reflect: { name: '照', files: ['reflect.jpg'] },
  shadow: { name: '影', files: ['shadow2603.jpg', 'shadow2621.jpg', 'shadow2622.jpg', 'shadow2628.jpg', 'shadow2631.jpg', 'shadow2632.jpg', 'shadow2635.jpg', 'shadow2639.jpg', 'shadow2640.jpg', 'shadow2643.jpg', 'shadow2647.jpg', 'shadow2649.jpg', 'shadow2653.jpg', 'shadow2660.jpg', 'shadow2671.jpg', 'shadow2682.jpg', 'shadow2689.jpg', 'shadow2693.jpg', 'shadow2697.jpg', 'shadow2703.jpg', 'shadow2709.jpg', 'shadow2721.jpg', 'shadow2732.jpg', 'shadow2736.jpg', 'shadow2758.jpg', 'shadow2777.jpg', 'shadow2788.jpg', 'shadow2797.jpg', 'shadow2810.jpg', 'shadow2812.jpg', 'shadow2814.jpg', 'shadow2834.jpg', 'shadow2836.jpg', 'shadow2873.jpg', 'shadow2882.jpg', 'shadow2898.jpg', 'shadow2927.jpg'] },
  still: { name: '靜', files: ['still0875.jpg', 'still0891.jpg', 'still0893.jpg', 'still0901.jpg', 'still0913.jpg', 'still0914.jpg', 'still0924.jpg', 'still0928.jpg', 'still0941.jpg', 'still0942.jpg', 'still0948.jpg', 'still0952.jpg', 'still0963.jpg', 'still0979.jpg', 'still0985.jpg', 'still0992.jpg', 'still1021.jpg', 'still1027.jpg', 'still1034.jpg', 'still1043.jpg', 'still1047.jpg', 'still1050.jpg', 'still1066.jpg', 'still1081.jpg', 'still1087.jpg'] }
};

export default function SubGallery() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // 💡 用來控制當前放大檢視的照片檔名
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const collectionKey = id && galleryData[id] ? id : 'huan';
  const data = galleryData[collectionKey];

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
                onClick={() => setSelectedPhoto(filename)} // 點擊設定放大照片
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
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // 點擊背景關閉
            onClick={() => setSelectedPhoto(null)}
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
              src={`/real/${collectionKey}/${selectedPhoto}`}
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