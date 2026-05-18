// src/pages/OrderHistory.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import orderService from '../services/orderService';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await orderService.getMyOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Lỗi lấy lịch sử đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm hiển thị "Badge" trạng thái đơn hàng theo màu sắc sang trọng
  const renderStatusBadge = (status) => {
    let text = 'Chờ xử lý';
    let bgColor = '#fff9db';
    let color = '#f59f00';

    switch (status) {
      case 'CONFIRMED':
        text = 'Đã xác nhận';
        bgColor = '#e3faf2';
        color = '#0ca678';
        break;
      case 'SHIPPED':
        text = 'Đang giao hàng';
        bgColor = '#e8f7ff';
        color = '#1c7ed6';
        break;
      case 'DELIVERED':
        text = 'Đã giao thành công';
        bgColor = '#ebfbee';
        color = '#2b8a3e';
        break;
      case 'CANCELLED':
        text = 'Đã hủy';
        bgColor = '#fff5f5';
        color = '#c92a2a';
        break;
      default:
        break;
    }

    return (
      <span style={{ 
        padding: '6px 16px', 
        borderRadius: '50px', 
        backgroundColor: bgColor, 
        color: color, 
        fontSize: '13px', 
        fontWeight: '600',
        display: 'inline-block'
      }}>
        {text}
      </span>
    );
  };

  // Hàm lấy ảnh tĩnh cho các sản phẩm trong đơn hàng (Đồng bộ với trang chủ)
  const getStaticImage = (id) => {
    const images = [
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80"
    ];
    const safeId = parseInt(id, 10) || 0; 
    return images[safeId % images.length];
  };

  if (loading) {
    return <div style={{ padding: '100px', textAlign: 'center', color: '#666' }}>Đang tải lịch sử mua sắm...</div>;
  }

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '50px 0', minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '30px', color: '#1a1a1a' }}>
          Đơn hàng đã mua
        </h2>

        {orders.length === 0 ? (
          <div style={{ backgroundColor: '#fff', padding: '60px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
            <p style={{ color: '#666', fontSize: '16px', marginBottom: '20px' }}>Bạn chưa đặt đơn hàng nào.</p>
            <Link to="/" className="btn-primary">Mua sắm ngay</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {orders.map((order) => (
              <div key={order.id} style={{ 
                backgroundColor: '#fff', 
                borderRadius: '16px', 
                padding: '25px', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                border: '1px solid #f0f0f0'
              }}>
                {/* Phần đầu của Card đơn hàng */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f1f1', paddingBottom: '15px', marginBottom: '20px' }}>
                  <div>
                    <span style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '16px' }}>Mã đơn hàng: #HM{order.id}</span>
                    <p style={{ margin: '4px 0 0 0', color: '#888', fontSize: '13px' }}>
                      Ngày đặt: {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : 'Gần đây'}
                    </p>
                  </div>
                  <div>{renderStatusBadge(order.status)}</div>
                </div>

                {/* Danh sách các sản phẩm bên trong đơn hàng này */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {order.items?.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <img 
                        src={item.product?.imageUrl || getStaticImage(item.product?.id)} 
                        alt={item.product?.name} 
                        style={{ width: '65px', height: '65px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' }} 
                      />
                      <div style={{ flexGrow: 1 }}>
                        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#333' }}>
                          {item.product?.name || 'Sản phẩm gia dụng'}
                        </h4>
                        <p style={{ margin: '4px 0 0 0', color: '#777', fontSize: '13px' }}>
                          Số lượng: {item.quantity} x <span style={{ color: '#d32f2f', fontWeight: '500' }}>{(item.price || 0).toLocaleString('vi-VN')} đ</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Phần chân Card: Hiển thị tổng số tiền đơn hàng */}
                <div style={{ borderTop: '1px solid #f1f1f1', marginTop: '20px', paddingTop: '15px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#666', fontSize: '14px' }}>Tổng số tiền:</span>
                  <span style={{ fontSize: '20px', fontWeight: '700', color: '#d32f2f' }}>
                    {(order.totalPrice || 0).toLocaleString('vi-VN')} đ
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;