// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/productService';
import cartService from '../services/cartService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getAll()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Vui lòng đăng nhập để thêm vào giỏ hàng!');
      return;
    }
    try {
      await cartService.add(productId);
      alert('Đã thêm sản phẩm vào giỏ hàng!');
    } catch (error) {
      alert('Thêm vào giỏ hàng thất bại.');
    }
  };

  // --- BỘ LINK ẢNH TĨNH GIA DỤNG SIÊU ỔN ĐỊNH NEW 100% ---
  const getStaticImage = (id) => {
    const images = [
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=500&q=80", // Lò vi sóng điện tử
      "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?auto=format&fit=crop&w=500&q=80", // Máy xay sinh tố cao cấp
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=500&q=80", // Nồi cơm điện cao tần
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=500&q=80", // Nồi áp suất thông minh
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=500&q=80"  // Quạt điện/Máy hút bụi
    ];
    // Ép kiểu ID về số nguyên để loại bỏ hoàn toàn lỗi trắng ô
    const safeId = parseInt(id, 10) || 0; 
    return images[safeId % images.length];
  };

  if (loading) {
    return <div style={{ padding: '100px', textAlign: 'center', color: '#666' }}>Đang tải tinh hoa gia dụng...</div>;
  }

  return (
    <div style={{ backgroundColor: '#fff' }}>
      
      {/* === HERO BANNER CỰC CHÁY CHUẨN TAPUHO === */}
      <div style={{ 
        width: '100%', 
        height: '450px', 
        backgroundImage: 'url("https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        marginBottom: '60px',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Lớp phủ mờ màu gradient để chữ nổi bật hơn */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, rgba(0, 132, 255, 0.95) 0%, rgba(0, 132, 255, 0.6) 50%, rgba(0,0,0,0) 100%)' }}></div>
        
        {/* Nội dung chữ trên Banner */}
        <div className="container" style={{ position: 'relative', zIndex: 1, color: 'white', maxWidth: '1200px', width: '100%', padding: '0 20px' }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '20px', fontWeight: '500', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '15px', color: '#ffd700' }}>
            Bộ sưu tập mùa hè 2026
          </h2>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '60px', fontWeight: '800', lineHeight: '1.1', marginBottom: '25px', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
            CHẠM TIỆN NGHI <br/> CHILL SỐNG CHẤT!
          </h1>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '18px', maxWidth: '500px', marginBottom: '40px', opacity: 0.9 }}>
            Khám phá ngay các dòng sản phẩm gia dụng thông minh thế hệ mới từ HomeMart. Tiết kiệm điện năng, nâng tầm không gian sống.
          </p>
          <button className="btn-primary" style={{ backgroundColor: 'white', color: '#0084ff', padding: '15px 40px', fontSize: '18px', boxShadow: '0 10px 20px rgba(0,0,0,0.15)' }}>
            Khám phá ngay <i className="fas fa-arrow-right" style={{ marginLeft: '10px' }}></i>
          </button>
        </div>
      </div>
      {/* === KẾT THÚC HERO BANNER === */}


      {/* 2. Product Grid (Dạng lưới 4 cột sang trọng) */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 80px 20px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '40px' 
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1a1a1a' }}>Sản phẩm nổi bật</h2>
          <Link to="/products" style={{ color: '#0056b3', fontWeight: '500', fontSize: '15px' }}>
            Xem tất cả →
          </Link>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
          gap: '30px' 
        }}>
          {products.map((product) => (
            <div key={product.id} className="product-card" style={{ 
              backgroundColor: '#fff', 
              borderRadius: '16px', 
              overflow: 'hidden', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'all 0.3s ease',
              border: '1px solid #f0f0f0',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            }}
            >
              {/* === HÌNH ẢNH SẢN PHẨM ĐÃ ĐƯỢC CẬP NHẬT ẢNH THẬT TRÀN VIỀN === */}
              <Link to={`/product/${product.id}`} style={{ display: 'block', padding: '0px' }}>
                <img 
                  src={product.imageUrl || getStaticImage(product.id)} 
                  alt={product.name} 
                  style={{ 
                    width: '100%', 
                    height: '240px', 
                    objectFit: 'cover', 
                    transition: 'transform 0.5s ease',
                    borderBottom: '1px solid #f0f0f0'
                  }} 
                />
              </Link>

              {/* Thông tin sản phẩm */}
              <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Link to={`/product/${product.id}`} style={{ display: 'block', marginBottom: '10px' }}>
                  <h3 style={{ 
                    fontSize: '17px', 
                    fontWeight: '600', 
                    color: '#1a1a1a', 
                    margin: '0 0 8px 0',
                    lineHeight: '1.4',
                    height: '48px', 
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {product.name}
                  </h3>
                </Link>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <p style={{ 
                    fontSize: '18px', 
                    fontWeight: '700', 
                    color: '#d32f2f', 
                    margin: 0 
                  }}>
                    {product.price.toLocaleString('vi-VN')} đ
                  </p>
                  
                  {/* Nút thêm vào giỏ */}
                  <button 
                    onClick={() => handleAddToCart(product.id)}
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      backgroundColor: '#f0f7ff', 
                      border: 'none', 
                      color: '#0056b3', 
                      fontSize: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0f0ff'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f0f7ff'}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;