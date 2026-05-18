// src/pages/Cart.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cartService from '../services/cartService';
import { useNavigate } from 'react-router-dom'; // Thêm cái này để chuyển trang
import orderService from '../services/orderService'; // Thêm service vừa tạo

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await cartService.getCart();
      const items = response.cartItems || response.items || response || [];
      setCartItems(Array.isArray(items) ? items : []);
    } catch (error) {
      console.error("Lỗi khi tải giỏ hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await cartService.updateQuantity(itemId, newQuantity);
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      alert('Lỗi khi cập nhật số lượng.');
    }
  };

  const handleRemove = async (item) => {
    const targetId = item.id || item.cartItemId || item.productId || item.product?.id; 
    if (!targetId) {
      alert('Lỗi: Không tìm thấy ID để xóa.');
      return;
    }
    if (!window.confirm('Bạn có chắc chắn muốn bỏ sản phẩm này khỏi giỏ hàng?')) return;

    try {
      await cartService.remove(targetId);
      setCartItems(prevItems => prevItems.filter(x => 
        x.id !== targetId && x.cartItemId !== targetId && x.product?.id !== targetId
      ));
    } catch (error) {
      alert('Xóa sản phẩm thất bại.');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.product?.price || item.price || 0) * item.quantity, 0);
  };

  const navigate = useNavigate(); // Khởi tạo biến chuyển trang

  // --- CHỨC NĂNG THANH TOÁN (CHECKOUT) ---
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng của bạn đang trống!');
      return;
    }

    if (!window.confirm('Xác nhận đặt hàng với tổng số tiền: ' + calculateTotal().toLocaleString('vi-VN') + ' đ?')) {
      return;
    }

    try {
      setLoading(true); // Hiện trạng thái đang tải
      await orderService.checkout(); // Gọi API chốt đơn
      
      alert('🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại HomeMart.');
      setCartItems([]); // Làm trống giỏ hàng trên giao diện
      navigate('/orders');
      
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);
      alert('Đặt hàng thất bại. Vui lòng kiểm tra lại!');
    } finally {
      setLoading(false);
    }
  };

  // Hàm tạo ảnh cho Giỏ hàng (Giống hệt bên Home.jsx)
  const getStaticImage = (id) => {
    const images = [
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1556909211-3698715af8f3?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=400&q=80"
    ];
    const safeId = Number(id) || 0; 
    return images[safeId % images.length];
  };

  if (loading) {
    return <div style={{ padding: '100px', textAlign: 'center', color: '#666' }}>Đang kết nối giỏ hàng...</div>;
  }

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '60px 0', minHeight: '80vh' }}>
      <div className="container">
        <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '40px' }}>Giỏ hàng của bạn ({cartItems.length} sản phẩm)</h2>
        
        {cartItems.length === 0 ? (
          <div style={{ border: '1px solid #eaeaea', borderRadius: '16px', padding: '80px', textAlign: 'center', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <p style={{ fontSize: '18px', color: '#555', marginBottom: '30px' }}>Giỏ hàng của bạn đang trống.</p>
            <Link to="/" className="btn-primary">Tiếp tục mua sắm</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '30px', alignItems: 'start' }}>
            
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '10px 30px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Đơn giá</th>
                    <th style={{ textAlign: 'center' }}>Số lượng</th>
                    <th style={{ textAlign: 'right' }}>Số tiền</th>
                    <th style={{ textAlign: 'right' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        {/* HÌNH ẢNH SẢN PHẨM Ở GIỎ HÀNG */}
                        <img 
                          src={item.product?.imageUrl || getStaticImage(item.product?.id)} 
                          alt={item.product?.name} 
                          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' }} 
                        />
                        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '500', maxWidth: '200px' }}>{item.product?.name || 'Sản phẩm HomeMart'}</h4>
                      </td>
                      <td className="product-price" style={{ fontSize: '16px' }}>{(item.product?.price || item.price || 0).toLocaleString('vi-VN')} đ</td>
                      <td>
                        <div className="quantity-control" style={{ margin: '0 auto' }}>
                          <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: '700' }}>{((item.product?.price || item.price || 0) * item.quantity).toLocaleString('vi-VN')} đ</td>
                      <td style={{ textAlign: 'right' }}>
                        <button 
                          onClick={() => handleRemove(item)}
                          style={{ background: 'none', border: 'none', color: '#999', fontSize: '12px' }}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '25px' }}>Tóm tắt đơn hàng</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#666' }}>
                <span>Tạm tính ({cartItems.length} sản phẩm)</span>
                <span style={{ fontWeight: '500', color: '#1a1a1a' }}>{calculateTotal().toLocaleString('vi-VN')} đ</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#666' }}>
                <span>Phí vận chuyển</span>
                <span style={{ color: '#2e7d32', fontWeight: '500' }}>Miễn phí</span>
              </div>
              <div style={{ borderTop: '1px solid #eee', marginTop: '20px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <span style={{ fontSize: '16px', fontWeight: '600' }}>Tổng cộng</span>
                <span style={{ fontSize: '24px', fontWeight: '700', color: '#d32f2f' }}>{calculateTotal().toLocaleString('vi-VN')} đ</span>
              </div>
              <button 
                onClick={handleCheckout} 
                className="btn-primary" 
                style={{ width: '100%', padding: '15px', fontSize: '16px', backgroundColor: '#d32f2f' }}
              >
                Tiến hành thanh toán
              </button>
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to="/" style={{ color: '#0056b3', fontSize: '14px' }}>← Tiếp tục mua sắm</Link>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;