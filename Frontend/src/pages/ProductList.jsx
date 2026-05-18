// src/pages/ProductList.jsx
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom'; // Thêm useSearchParams để đọc tham số URL
import productService from '../services/productService';
import cartService from '../services/cartService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams(); // Hook để lấy các tham số như ?name=... trên URL
  
  // Đọc từ khóa "name" từ URL, nếu không có thì mặc định là chuỗi rỗng
  const nameQuery = searchParams.get('name') || ''; 

  // Mỗi khi từ khóa trên URL thay đổi, useEffect sẽ tự động chạy lại để gọi API mới
  useEffect(() => {
    setLoading(true);
    // Gọi API search của Backend
    productService.searchProducts(nameQuery, '', '', 0, 12) 
      .then(response => {
        // Backend trả về dạng Page object, danh sách thực tế nằm trong trường 'content'
        const dataContent = response.content || response.data?.content || response;
        setProducts(Array.isArray(dataContent) ? dataContent : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tìm kiếm sản phẩm:", err);
        setProducts([]);
        setLoading(false);
      });
  }, [nameQuery]); // Lắng nghe sự thay đổi của từ khóa tìm kiếm

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

  // Hàm gán ảnh tĩnh cao cấp tránh bị lỗi trống ô vuông (Đồng bộ toàn hệ thống)
  const getStaticImage = (id) => {
    const images = [
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=500&q=80"
    ];
    const safeId = parseInt(id, 10) || 0; 
    return images[safeId % images.length];
  };

  if (loading) {
    return <div style={{ padding: '100px', textAlign: 'center', color: '#666' }}>Đang tìm kiếm tinh hoa gia dụng...</div>;
  }

  return (
    <div style={{ backgroundColor: '#fff', padding: '60px 0', minHeight: '80vh' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '30px', alignItems: 'start', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* 1. Sidebar Danh mục bên trái */}
        <div style={{ paddingRight: '20px', position: 'sticky', top: '100px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', borderBottom: '2px solid #0084ff', paddingBottom: '8px' }}>Danh mục sản phẩm</h3>
          <ul style={{ listStyle: 'none', gap: '15px', display: 'flex', flexDirection: 'column', fontSize: '14px', color: '#555', fontWeight: '500' }}>
            <li style={{ cursor: 'pointer', color: '#0084ff' }}>Tất cả sản phẩm</li>
            <li style={{ cursor: 'pointer' }}>Nồi cơm điện cao tần</li>
            <li style={{ cursor: 'pointer' }}>Quạt điện thông minh</li>
            <li style={{ cursor: 'pointer' }}>Máy xay sinh tố</li>
            <li style={{ cursor: 'pointer' }}>Lò vi sóng hiện đại</li>
          </ul>
        </div>

        {/* 2. Khung Grid kết quả sản phẩm */}
        <div>
          <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>
              {nameQuery ? `Kết quả tìm kiếm cho: "${nameQuery}"` : "Tất cả sản phẩm nổi bật"}
            </h1>
            <div style={{ fontSize: '14px', color: '#666' }}>Tìm thấy {products.length} sản phẩm</div>
          </div>

          {products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#666' }}>
              <i className="fas fa-search-minus" style={{ fontSize: '48px', marginBottom: '20px', color: '#ccc' }}></i>
              <p style={{ fontSize: '16px' }}>Không tìm thấy sản phẩm nào khớp với từ khóa của bạn.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '25px' }}>
              {products.map((product) => (
                <div key={product.id} className="product-card" style={{ 
                  backgroundColor: '#fff', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                  border: '1px solid #f0f0f0',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Hình ảnh */}
                  <Link to={`/product/${product.id}`} style={{ display: 'block' }}>
                    <img 
                      src={product.imageUrl || getStaticImage(product.id)} 
                      alt={product.name} 
                      style={{ width: '100%', height: '220px', objectFit: 'cover', borderBottom: '1px solid #f5f5f5' }} 
                    />
                  </Link>

                  {/* Thông tin */}
                  <div style={{ padding: '15px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Link to={`/product/${product.id}`} style={{ display: 'block', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 4px 0', lineHeight: '1.4', height: '42px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: '#d32f2f', margin: 0 }}>
                        {product.price.toLocaleString('vi-VN')} đ
                      </p>
                      <button 
                        onClick={() => handleAddToCart(product.id)}
                        style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#f0f7ff', border: 'none', color: '#0056b3', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductList;