import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import { Bar } from 'react-chartjs-2'; // Thư viện biểu đồ
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Cấu hình ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra quyền Admin dựa trên email đã lưu lúc đăng nhập
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail !== 'admin@gmail.com') {
      alert("Bạn không có quyền truy cập vùng Admin!");
      navigate('/');
      return;
    }
    loadProducts();
  }, [navigate]);

  const loadProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data || []);
    } catch (error) {
      console.error("Lỗi tải sản phẩm:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      try {
        // Giả sử bạn đã có API xóa: await productService.delete(id);
        alert("Xóa thành công!");
        loadProducts();
      } catch (error) {
        alert("Xóa thất bại. Vui lòng kiểm tra lại quyền Admin ở Backend.");
      }
    }
  };

  // Dữ liệu giả lập cho biểu đồ doanh thu
  const chartData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
    datasets: [{
      label: 'Doanh thu (VNĐ)',
      data: [12000000, 19000000, 15000000, 25000000, 30000000],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    }]
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      {/* Sidebar bên trái */}
      <div style={{ width: '250px', backgroundColor: '#2c3e50', color: 'white', padding: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '40px' }}>HomeMart Admin</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ padding: '15px 0', borderBottom: '1px solid #34495e', cursor: 'pointer', color: '#3498db' }}>📊 Bảng điều khiển</li>
          <li style={{ padding: '15px 0', borderBottom: '1px solid #34495e', cursor: 'pointer' }}>📦 Quản lý sản phẩm</li>
          <li style={{ padding: '15px 0', borderBottom: '1px solid #34495e', cursor: 'pointer' }}>🛒 Đơn hàng</li>
          <li onClick={() => navigate('/')} style={{ padding: '15px 0', cursor: 'pointer', marginTop: '50px' }}>🏠 Quay lại trang chủ</li>
        </ul>
      </div>

      {/* Nội dung chính */}
      <div style={{ flex: 1, padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ margin: 0, fontSize: '24px' }}>Báo cáo thống kê</h1>
          <Link to="/admin/product/add" style={{ padding: '10px 20px', backgroundColor: '#27ae60', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
            + Thêm sản phẩm mới
          </Link>
        </div>

        {/* Khối chỉ số nhanh */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <div style={{ flex: 1, padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderLeft: '5px solid #3498db' }}>
            <p style={{ color: '#7f8c8d', margin: '0 0 10px 0' }}>Tổng sản phẩm</p>
            <h2 style={{ margin: 0 }}>{products.length}</h2>
          </div>
          <div style={{ flex: 1, padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderLeft: '5px solid #e67e22' }}>
            <p style={{ color: '#7f8c8d', margin: '0 0 10px 0' }}>Đơn hàng mới</p>
            <h2 style={{ margin: 0 }}>15</h2>
          </div>
          <div style={{ flex: 1, padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderLeft: '5px solid #2ecc71' }}>
            <p style={{ color: '#7f8c8d', margin: '0 0 10px 0' }}>Doanh thu tháng</p>
            <h2 style={{ margin: 0 }}>30.000.000đ</h2>
          </div>
        </div>

        {/* Biểu đồ */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0 }}>Tăng trưởng doanh thu</h3>
          <div style={{ height: '300px' }}>
            <Bar data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Bảng danh sách sản phẩm */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0 }}>Quản lý kho hàng</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left' }}>
                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Tên sản phẩm</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6' }}>Giá niêm yết</th>
                <th style={{ padding: '12px', borderBottom: '2px solid #dee2e6', textAlign: 'center' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{p.name}</td>
                  <td style={{ padding: '12px', color: '#d35400', fontWeight: 'bold' }}>{p.price?.toLocaleString()}đ</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <Link to={`/admin/product/edit/${p.id}`} style={{ marginRight: '15px', color: '#3498db', textDecoration: 'none' }}>✏️ Sửa</Link>
                    <button onClick={() => handleDelete(p.id)} style={{ border: 'none', background: 'none', color: '#e74c3c', cursor: 'pointer' }}>🗑️ Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;