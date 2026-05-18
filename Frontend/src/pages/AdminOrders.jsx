// src/pages/Admin/AdminOrders.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../services/adminService';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail !== 'admin@gmail.com') {
      navigate('/');
      return;
    }
    loadOrders();
  }, [navigate]);

  const loadOrders = async () => {
    try {
      const data = await adminService.getAllOrders();
      setOrders(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi tải đơn hàng:", error);
      setLoading(false);
    }
  };

  // --- API CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG ---
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await adminService.updateOrderStatus(orderId, newStatus);
      alert('Đã cập nhật trạng thái đơn hàng!');
      loadOrders(); // Gọi lại để làm mới giao diện
    } catch (error) {
      alert('Cập nhật thất bại!');
    }
  };

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Đang tải danh sách đơn hàng...</div>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      {/* Sidebar giống hệt Dashboard */}
      <div style={{ width: '250px', backgroundColor: '#2c3e50', color: 'white', padding: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '40px' }}>HomeMart Admin</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li onClick={() => navigate('/admin')} style={{ padding: '15px 0', borderBottom: '1px solid #34495e', cursor: 'pointer' }}>📊 Bảng điều khiển</li>
          <li style={{ padding: '15px 0', borderBottom: '1px solid #34495e', cursor: 'pointer', color: '#3498db' }}>🛒 Quản lý Đơn hàng</li>
          <li onClick={() => navigate('/')} style={{ padding: '15px 0', cursor: 'pointer', marginTop: '50px' }}>🏠 Quay lại trang chủ</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px' }}>
        <h1 style={{ margin: '0 0 30px 0', fontSize: '24px' }}>Quản lý Đơn Hàng</h1>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left' }}>
                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Mã Đơn</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Ngày đặt</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Tổng tiền</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Cập nhật trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px 12px', fontWeight: 'bold' }}>#HM{order.id}</td>
                  <td style={{ padding: '12px' }}>{order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : 'Mới'}</td>
                  <td style={{ padding: '12px', color: '#d32f2f', fontWeight: '600' }}>{(order.totalPrice || 0).toLocaleString('vi-VN')} đ</td>
                  <td style={{ padding: '12px' }}>
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{ 
                        padding: '8px 12px', 
                        borderRadius: '5px', 
                        border: '1px solid #ccc',
                        backgroundColor: order.status === 'PENDING' ? '#fff9db' : order.status === 'DELIVERED' ? '#ebfbee' : '#e8f7ff',
                        fontWeight: '500',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="PENDING">Chờ xử lý</option>
                      <option value="CONFIRMED">Đã xác nhận</option>
                      <option value="SHIPPED">Đang giao hàng</option>
                      <option value="DELIVERED">Đã giao thành công</option>
                      <option value="CANCELLED">Hủy đơn</option>
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: '#777' }}>Chưa có đơn hàng nào trong hệ thống.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;