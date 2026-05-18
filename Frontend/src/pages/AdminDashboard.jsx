import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import adminService from '../services/adminService'; // Import adminService của bạn
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Các State phục vụ việc Thêm/Sửa sản phẩm ngay trên trang
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', imageUrl: '' });

  useEffect(() => {
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

  // --- XỬ LÝ API XÓA ---
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn sản phẩm này không?")) {
      try {
        await adminService.deleteProduct(id);
        alert("Xóa thành công!");
        loadProducts(); // Tải lại bảng sau khi xóa
      } catch (error) {
        alert("Xóa thất bại. Sản phẩm có thể đang nằm trong đơn hàng của khách.");
      }
    }
  };

  // --- XỬ LÝ BẬT FORM THÊM MỚI ---
  const handleOpenAdd = () => {
    setEditId(null);
    setFormData({ name: '', price: '', description: '', imageUrl: '' });
    setShowForm(true);
  };

  // --- XỬ LÝ BẬT FORM SỬA ---
  const handleOpenEdit = (product) => {
    setEditId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description || '',
      imageUrl: product.imageUrl || ''
    });
    setShowForm(true);
  };

  // --- XỬ LÝ API THÊM/SỬA (LƯU FORM) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, price: Number(formData.price) };
      if (editId) {
        await adminService.updateProduct(editId, payload);
        alert("Cập nhật thành công!");
      } else {
        await adminService.addProduct(payload);
        alert("Thêm sản phẩm mới thành công!");
      }
      setShowForm(false);
      loadProducts();
    } catch (error) {
      alert("Lưu thất bại. Vui lòng thử lại!");
    }
  };

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
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#2c3e50', color: 'white', padding: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '40px' }}>HomeMart Admin</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ padding: '15px 0', borderBottom: '1px solid #34495e', cursor: 'pointer', color: '#3498db' }}>📊 Bảng điều khiển</li>
          <li onClick={() => navigate('/admin/orders')} style={{ padding: '15px 0', borderBottom: '1px solid #34495e', cursor: 'pointer' }}>🛒 Quản lý Đơn hàng</li>
          <li onClick={() => navigate('/')} style={{ padding: '15px 0', cursor: 'pointer', marginTop: '50px' }}>🏠 Quay lại trang chủ</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ margin: 0, fontSize: '24px' }}>Quản lý Sản Phẩm</h1>
          <button onClick={handleOpenAdd} style={{ padding: '10px 20px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
            + Thêm sản phẩm mới
          </button>
        </div>

        {/* Khối chỉ số */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <div style={{ flex: 1, padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderLeft: '5px solid #3498db' }}>
            <p style={{ color: '#7f8c8d', margin: '0 0 10px 0' }}>Tổng sản phẩm</p>
            <h2 style={{ margin: 0 }}>{products.length}</h2>
          </div>
          <div style={{ flex: 1, padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderLeft: '5px solid #2ecc71' }}>
            <p style={{ color: '#7f8c8d', margin: '0 0 10px 0' }}>Doanh thu tháng</p>
            <h2 style={{ margin: 0 }}>30.000.000đ</h2>
          </div>
        </div>

        {/* Biểu đồ */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginTop: 0 }}>Tăng trưởng doanh thu</h3>
          <div style={{ height: '250px' }}><Bar data={chartData} options={{ maintainAspectRatio: false }} /></div>
        </div>

        {/* FORM THÊM / SỬA ẨN HIỆN */}
        {showForm && (
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', marginBottom: '30px', borderLeft: '4px solid #f39c12', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h3>{editId ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input type="text" placeholder="Tên sản phẩm" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
              <input type="number" placeholder="Giá bán" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
              <input type="text" placeholder="Link ảnh (Tùy chọn)" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} style={{ gridColumn: 'span 2', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
              <textarea placeholder="Mô tả" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ gridColumn: 'span 2', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
              <div style={{ gridColumn: 'span 2', display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Lưu lại</button>
                <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 20px', border: '1px solid #ccc', background: '#fff', borderRadius: '5px', cursor: 'pointer' }}>Hủy</button>
              </div>
            </form>
          </div>
        )}

        {/* Bảng sản phẩm */}
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
                  <td style={{ padding: '12px', color: '#d35400', fontWeight: 'bold' }}>{p.price?.toLocaleString('vi-VN')}đ</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button onClick={() => handleOpenEdit(p)} style={{ border: 'none', background: 'none', marginRight: '15px', color: '#3498db', cursor: 'pointer' }}>✏️ Sửa</button>
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