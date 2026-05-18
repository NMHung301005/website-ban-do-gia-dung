import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
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
      // Gọi API đăng ký tới Spring Boot
      await authService.register(formData);
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login'); // Chuyển sang trang đăng nhập
    } catch (err) {
      console.error(err);
  
      setError('Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '30px', border: '1px solid #eaeaea', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Đăng ký tài khoản</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center', fontSize: '14px' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/*  */}
        <input 
          type="text" name="username" placeholder="Tên đăng nhập" required
          value={formData.username} onChange={handleChange}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }} 
        />
        <input 
          type="email" name="email" placeholder="Email của bạn" required
          value={formData.email} onChange={handleChange}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }} 
        />
        <input 
          type="password" name="password" placeholder="Mật khẩu" required
          value={formData.password} onChange={handleChange}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }} 
        />
        
        <button 
          type="submit" disabled={loading}
          style={{ padding: '12px', backgroundColor: loading ? '#ccc' : '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
          {loading ? 'Đang xử lý...' : 'Đăng ký'}
        </button>
      </form>
      
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
        Đã có tài khoản? <Link to="/login" style={{ color: '#0056b3', textDecoration: 'none' }}>Đăng nhập ngay</Link>
      </div>
    </div>
  );
};

export default Register;