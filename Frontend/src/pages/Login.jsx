import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Gọi API đăng nhập từ authService
      const response = await authService.login(formData);
      
      // 2. Trích xuất token (tùy vào backend trả về 'token' hay 'accessToken')
      const token = response.token || response.accessToken; 
      if (token) {
        localStorage.setItem('accessToken', token);
      }
      
      // 3. Lưu email để các trang Dashboard/Account nhận diện vai trò
      localStorage.setItem('userEmail', formData.email);
      
      alert('Đăng nhập thành công!');

      // 4. Logic chuyển hướng: Admin đi một đường, User đi một nẻo
      if (formData.email === 'admin@gmail.com') {
        navigate('/admin'); // Chuyển thẳng đến Dashboard Admin
      } else {
        navigate('/'); // Chuyển về trang chủ cho User thường
      }
      
      // 5. Làm mới trạng thái ứng dụng để Header cập nhật icon Tài khoản/Đăng xuất
      window.location.reload(); 

    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      // Kiểm tra nếu lỗi do Backend trả về tin nhắn cụ thể
      const errorMsg = err.response?.data?.message || 'Sai email hoặc mật khẩu!';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '60px auto', 
      padding: '40px 30px', 
      border: '1px solid #eee', 
      borderRadius: '16px', 
      backgroundColor: '#fff', 
      boxShadow: '0 10px 25px rgba(0,0,0,0.05)' 
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1a1a1a', fontSize: '28px' }}>
        Chào mừng trở lại
      </h2>
      
      {error && (
        <div style={{ 
          color: '#d32f2f', 
          marginBottom: '20px', 
          textAlign: 'center', 
          fontSize: '14px', 
          backgroundColor: '#ffebee', 
          padding: '12px', 
          borderRadius: '8px',
          border: '1px solid #ffcdd2'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#555' }}>
            Email đăng nhập
          </label>
          <input 
            type="email" 
            name="email" 
            placeholder="admin@gmail.com" 
            required
            value={formData.email} 
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '14px', 
              borderRadius: '10px', 
              border: '1px solid #ddd', 
              outline: 'none', 
              boxSizing: 'border-box',
              fontSize: '15px',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#0056b3'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#555' }}>
            Mật khẩu
          </label>
          <input 
            type="password" 
            name="password" 
            placeholder="••••••••" 
            required
            value={formData.password} 
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '14px', 
              borderRadius: '10px', 
              border: '1px solid #ddd', 
              outline: 'none', 
              boxSizing: 'border-box',
              fontSize: '15px'
            }} 
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '16px', 
            backgroundColor: loading ? '#ccc' : '#0056b3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '10px', 
            cursor: loading ? 'not-allowed' : 'pointer', 
            fontWeight: '600', 
            fontSize: '16px', 
            marginTop: '10px',
            transition: 'background-color 0.3s, transform 0.1s'
          }}
          onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
        >
          {loading ? 'Đang kiểm tra...' : 'Đăng nhập'}
        </button>
      </form>

      <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '14px', color: '#777' }}>
        Bạn mới đến HomeMart? <Link to="/register" style={{ color: '#0056b3', textDecoration: 'none', fontWeight: '600' }}>Đăng ký tài khoản</Link>
      </div>
    </div>
  );
};

export default Login;