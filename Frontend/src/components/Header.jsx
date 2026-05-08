import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearch = () => {
    if (keyword.trim() !== '') {
      navigate(`/products?search=${keyword}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid #eaeaea', backgroundColor: '#fff' }}>
      {/* Logo */}
      <div className="logo">
        <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#0056b3', textDecoration: 'none' }}>
          🏠 HomeMart
        </Link>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="search-bar" style={{ display: 'flex', width: '500px' }}>
        <input 
          type="text" 
          placeholder="Tìm kiếm sản phẩm... (VD: quạt điện)" 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px 0 0 4px', outline: 'none' }} 
        />
        <button 
          onClick={handleSearch}
          style={{ padding: '10px 20px', backgroundColor: '#0056b3', color: '#fff', border: 'none', borderRadius: '0 4px 4px 0', cursor: 'pointer' }}
        >
          🔍
        </button>
      </div>

      {/* Cụm chức năng */}
      <div className="user-actions" style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        
        {isLoggedIn ? (
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {/* ĐÃ BỌC: Nhấn vào icon user hoặc chữ Tài khoản sẽ sang trang Account */}
            <Link to="/account" style={{ textAlign: 'center', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
              <span style={{ fontSize: '20px' }}>👤</span>
              <div style={{ fontSize: '12px', marginTop: '4px' }}>Tài khoản</div>
            </Link>

            <div onClick={handleLogout} style={{ textAlign: 'center', cursor: 'pointer', color: '#d0021b' }}>
              <span style={{ fontSize: '20px' }}>🚪</span>
              <div style={{ fontSize: '12px', marginTop: '4px' }}>Đăng xuất</div>
            </div>
          </div>
        ) : (
          <Link to="/login" style={{ textAlign: 'center', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: '20px' }}>👤</span>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>Đăng nhập</div>
          </Link>
        )}
        
        <div style={{ textAlign: 'center', cursor: 'pointer' }}>
          <span style={{ fontSize: '20px' }}>❤️</span>
          <div style={{ fontSize: '12px', marginTop: '4px' }}>Yêu thích</div>
        </div>
        
        <Link to="/cart" style={{ textAlign: 'center', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
          <span style={{ fontSize: '20px' }}>🛒</span>
          <div style={{ fontSize: '12px', marginTop: '4px' }}>Giỏ hàng</div>
        </Link>
      </div>
    </header>
  );
};

export default Header;