// src/pages/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../services/productService';
import cartService from '../services/cartService';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Biến để lưu số lượng người dùng chọn

  useEffect(() => {
    productService.getById(id)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await cartService.add(product.id, quantity); // Chú ý: bạn có thể cần sửa cartService để nhận thêm quantity
      alert('Đã thêm sản phẩm vào giỏ hàng!');
    } catch (error) {
      alert('Vui lòng đăng nhập để thêm vào giỏ hàng.');
    }
  };

  if (loading) return <div style={{ padding: '100px', textAlign: 'center', color: '#666' }}>Đang kết nối sản phẩm thông minh...</div>;
  if (!product) return <div style={{ padding: '100px', textAlign: 'center' }}>Không tìm thấy sản phẩm.</div>;

  return (
    <div style={{ backgroundColor: '#fff', padding: '80px 0' }}>
      <div className="container">
        {/* Breadcrumb sang trọng */}
        <div style={{ fontSize: '13px', color: '#777', marginBottom: '40px' }}>Trang chủ / Sản phẩm / {product.name}</div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'start' }}>
          {/* Cột 1: Ảnh sản phẩm */}
          <div style={{ border: '1px solid #eee', borderRadius: '16px', padding: '40px' }}>
            <img src={product.imageUrl || 'https://via.placeholder.com/600x600.png'} alt={product.name} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
          </div>
          
          {/* Cột 2: Thông tin chi tiết và Mua hàng */}
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '15px' }}>{product.name}</h1>
            <p style={{ fontSize: '14px', color: '#777', marginBottom: '30px' }}>Mã sản phẩm (SKU): HM{product.id}</p>
            <div className="product-price" style={{ fontSize: '36px', marginBottom: '30px' }}>{product.price.toLocaleString('vi-VN')} đ</div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
              <p style={{ margin: 0, fontWeight: '500' }}>Số lượng:</p>
              {/* --- BỘ TĂNG GIẢM SỐ LƯỢNG TRƯỚC KHI THÊM --- */}
              <div className="quantity-control">
                <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <button className="btn-primary" style={{ padding: '15px 40px', backgroundColor: '#d32f2f' }}>MUA NGAY</button>
              <button onClick={handleAddToCart} className="btn-primary" style={{ padding: '15px 30px' }}>THÊM VÀO GIỎ HÀNG</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;