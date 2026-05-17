import { useNavigate } from 'react-router-dom';

export default function CoverPage() {
  const navigate = useNavigate();

  return (
    <div className="cover-container" style={{ display: 'grid', placeItems: 'center', height: '100vh', background: '#000' }}>
      <div style={{ textAlign: 'center' }}>
        {/* 這裡請確保你的檔名是小寫 logo.png */}
        <img src="/logo.png" alt="LUMIN Logo" style={{ width: '800px', marginBottom: '2rem' }} />
        <br />
        <button className="nav-btn" onClick={() => navigate('/about')}>
          ENTER THE SPACE
        </button>
      </div>
    </div>
  );
}