import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productService from '../services/productService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAll();
        setProducts(data.slice(0, 8));
      } catch (error) {
        console.error("Lỗi lấy sản phẩm trang chủ:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { 
      name: 'Nồi cơm điện', 
      image: 'https://cdn-icons-png.flaticon.com/512/3069/3069352.png', 
      path: '/products?category=Nồi cơm điện' 
    },
    { 
      name: 'Quạt điện', 
      image: 'https://cdn-icons-png.flaticon.com/512/933/933181.png', 
      path: '/products?category=Quạt điện' 
    },
    { 
      name: 'Lò vi sóng', 
      image: 'https://cdn-icons-png.flaticon.com/512/2927/2927424.png', 
      path: '/products?category=Lò vi sóng' 
    },
    { 
      name: 'Tủ lạnh', 
      image: 'https://cdn-icons-png.flaticon.com/512/2451/2451859.png', 
      path: '/products?category=Tủ lạnh' 
    },
  ];

  return (
    <div style={{ 
      // NỀN TOÀN TRANG: Chuyển sắc từ xanh cực nhẹ sang trắng để trông hiện đại hơn
      background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)',
      minHeight: '100vh',
      paddingBottom: '80px'
    }}>
      
      {/* 1. SECTION TIÊU ĐỀ: BANNER VỚI HỌA TIẾT CHẤM BI (DOT PATTERN) */}
      <div style={{ 
        padding: '80px 20px', 
        textAlign: 'center',
        backgroundImage: `radial-gradient(#004494 0.5px, transparent 0.5px)`,
        backgroundSize: '24px 24px',
        backgroundColor: '#f0f7ff'
      }}>
        <div style={{ 
          display: 'inline-block',
          background: 'linear-gradient(90deg, #00337c 0%, #0056b3 100%)', // Gradient cho khối chữ
          padding: '30px 60px',
          borderRadius: '20px',
          boxShadow: '0 15px 35px rgba(0, 51, 124, 0.25)',
          border: '2px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h1 style={{ 
            fontSize: '40px', 
            margin: 0, 
            color: '#ffffff', 
            textTransform: 'uppercase', 
            letterSpacing: '3px', 
            fontWeight: '900',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Gia dụng thông minh - Hạnh phúc gia đình
          </h1>
        </div>
        <p style={{ 
          fontSize: '20px', 
          color: '#444', 
          marginTop: '25px', 
          fontWeight: '500',
          fontStyle: 'italic'
        }}>
          Khám phá các thiết bị hiện đại, nâng tầm không gian sống của bạn.
        </p>
      </div>

      {/* 2. SECTION DANH MỤC NỔI BẬT: THIẾT KẾ DẠNG TRÒN (CIRCLE) */}
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '26px', 
          marginBottom: '35px', 
          color: '#00337c', 
          borderLeft: '6px solid #00337c', 
          paddingLeft: '15px' 
        }}>
          Danh mục phổ biến
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '30px' 
        }}>
          {categories.map((cat, index) => (
            <Link 
              key={index} 
              to={cat.path} 
              style={{ 
                textDecoration: 'none', 
                color: 'inherit', 
                textAlign: 'center',
                backgroundColor: '#fff',
                borderRadius: '18px',
                padding: '30px 20px',
                boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                display: 'block',
                border: '1px solid #eee'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                e.currentTarget.style.borderColor = '#0056b3';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = '#eee';
              }}
            >
              {/* Vòng tròn bao quanh icon */}
              <div style={{ 
                backgroundColor: '#f0f7ff', 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                margin: '0 auto 15px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  style={{ width: '60px', height: '60px', objectFit: 'contain' }} 
                />
              </div>
              <p style={{ fontWeight: '800', fontSize: '18px', color: '#333', margin: 0 }}>
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. SECTION SẢN PHẨM MỚI NHẤT */}
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
          <h2 style={{ 
            fontSize: '26px', 
            color: '#00337c', 
            borderLeft: '6px solid #00337c', 
            paddingLeft: '15px',
            margin: 0
          }}>
            Sản phẩm dành cho bạn
          </h2>
          <Link to="/products" style={{ 
            color: '#0056b3', 
            textDecoration: 'none', 
            fontWeight: '700',
            fontSize: '16px'
          }}>
            Xem tất cả ưu đãi →
          </Link>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <div className="spinner"></div> {/* Bạn có thể thêm CSS spinner nếu muốn */}
            <p style={{ color: '#666', marginTop: '10px' }}>Đang chuẩn bị sản phẩm tốt nhất...</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '25px' 
          }}>
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} style={{ transition: '0.3s' }}>
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <p style={{ gridColumn: 'span 4', textAlign: 'center', color: '#999', padding: '40px' }}>
                Kho hàng đang được cập nhật, vui lòng quay lại sau nhé!
              </p>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default Home;