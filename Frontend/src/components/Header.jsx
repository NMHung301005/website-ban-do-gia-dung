import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'; 

const Header = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const [keyword, setKeyword] = useState(''); // State lưu từ khóa gõ vào ô tìm kiếm

  // Hàm kích hoạt khi người dùng nhấn nút Tìm kiếm hoặc Enter
  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // Chuyển hướng sang trang danh sách sản phẩm kèm query parameter ?name=...
      navigate(`/products?name=${encodeURIComponent(keyword.trim())}`);
    } else {
      navigate('/products'); // Nếu ô trống thì về trang tất cả sản phẩm
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userEmail');
    navigate('/login');
    window.location.reload();
  };

  return (
    <header style={{ backgroundColor: '#0084ff', color: 'white', padding: '15px 0', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Logo HomeMart */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ backgroundColor: 'white', color: '#0084ff', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '900' }}>
            H
          </div>
          <span style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '1px' }}>HOMEMART</span>
        </Link>

        {/* Thanh tìm kiếm trung tâm - ĐÃ SỬA THÀNH THẺ FORM ĐỂ CHẠY ĐỘNG */}
        <form onSubmit={handleSearch} style={{ flex: '0 1 500px', display: 'flex', position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm (VD: Quạt điện thông minh...)" 
            value={keyword} // Gắn state keyword vào đây
            onChange={(e) => setKeyword(e.target.value)} // Cập nhật state khi người dùng gõ chữ
            style={{ width: '100%', padding: '12px 20px', borderRadius: '50px', border: 'none', outline: 'none', fontSize: '14px', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)', color: '#333' }}
          />
          {/* Thêm type="submit" để khi bấm vào nút hoặc nhấn Enter trong ô input thì form tự kích hoạt tìm kiếm */}
          <button type="submit" style={{ position: 'absolute', right: '5px', top: '5px', bottom: '5px', width: '40px', borderRadius: '50%', backgroundColor: '#0084ff', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <i className="fas fa-search"></i>
          </button>
        </form>

        {/* Cụm chức năng (Icons) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', fontSize: '14px', fontWeight: '500' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-phone-volume" style={{ fontSize: '20px' }}></i>
            <span>1900 13 57 99</span>
          </div>

          <div style={{ width: '1px', height: '30px', backgroundColor: 'rgba(255,255,255,0.3)' }}></div>

          {userEmail ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Link to="/orders" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <i className="far fa-user-circle" style={{ fontSize: '20px' }}></i>
                <span style={{ fontSize: '12px' }}>{userEmail.split('@')[0]}</span>
              </Link>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <i className="fas fa-sign-out-alt" style={{ fontSize: '20px' }}></i>
                <span style={{ fontSize: '12px' }}>Đăng xuất</span>
              </button>
            </div>
          ) : (
            <Link to="/login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <i className="far fa-user-circle" style={{ fontSize: '20px' }}></i>
              <span style={{ fontSize: '12px' }}>Đăng nhập</span>
            </Link>
          )}

          <Link to="/cart" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', position: 'relative' }}>
            <i className="fas fa-shopping-cart" style={{ fontSize: '20px' }}></i>
            <span style={{ fontSize: '12px' }}>Giỏ hàng</span>
            <span style={{ position: 'absolute', top: '-5px', right: '5px', width: '10px', height: '10px', backgroundColor: '#ff3b30', borderRadius: '50%' }}></span>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;