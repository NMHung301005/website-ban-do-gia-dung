import { useState, useEffect } from 'react';
import orderService from '../services/orderService'; // Cần file service này!

const Account = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        setLoading(true);
        // Gọi API lấy đơn hàng (Cần nhắc backend API này trả về đơn hàng theo TOKEN gửi sang)
        const response = await orderService.checkout(); // Tạm dùng service order hiện có, hoặc tạo orderService.getMyOrders()
        // Giả sử API trả về mảng, ta gom lại
        setOrders(Array.isArray(response) ? response : []); 
      } catch (err) {
        console.error("Lỗi lấy đơn hàng:", err);
        setError("Không thể tải danh sách đơn hàng.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '8px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '30px' }}>Quản lý tài khoản</h2>
      
      <div style={{ display: 'flex', gap: '30px' }}>
        {/* Sidebar */}
        <aside style={{ width: '200px' }}>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2.5' }}>
            <li style={{ fontWeight: 'bold', color: '#0056b3' }}>Đơn hàng đã mua</li>
            <li style={{ cursor: 'not-allowed', color: '#999' }}>Thông tin cá nhân (Sắp có)</li>
            <li style={{ cursor: 'not-allowed', color: '#999' }}>Đổi mật khẩu (Sắp có)</li>
          </ul>
        </aside>

        {/* Nội dung đơn hàng */}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Đơn hàng gần đây</h3>
          
          {loading && <p>Đang tải...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          
          {!loading && !error && orders.length === 0 && (
             <div style={{ padding: '30px', border: '1px solid #eaeaea', textAlign: 'center', color: '#666' }}>
               Bạn chưa có đơn hàng nào.
             </div>
          )}

          {!loading && !error && orders.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {orders.map(order => (
                <div key={order.id} style={{ border: '1px solid #eaeaea', borderRadius: '4px', padding: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontWeight: 'bold' }}>Mã đơn: #{order.id}</span>
                    <span style={{ fontSize: '14px', color: '#0056b3' }}>{order.status || 'Đang xử lý'}</span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                     Tổng tiền: <span style={{ fontWeight: 'bold', color: '#d0021b', fontSize: '16px' }}>{formatPrice(order.totalPrice)}</span>
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

export default Account;