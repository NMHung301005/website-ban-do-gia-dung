import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productService from '../services/productService';

const ProductForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', price: '', description: '', image: '' });

  useEffect(() => {
    if (id) {
      productService.getById(id).then(data => setProduct(data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Gọi API cập nhật (cần có hàm update trong service)
        alert("Cập nhật thành công!");
      } else {
        // Gọi API thêm mới (cần có hàm add trong service)
        alert("Thêm mới thành công!");
      }
      navigate('/admin');
    } catch (error) {
      alert("Lỗi khi lưu sản phẩm.");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h2>{id ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input type="text" placeholder="Tên sản phẩm" value={product.name} onChange={e => setProduct({...product, name: e.target.value})} required style={{ padding: '10px' }} />
        <input type="number" placeholder="Giá" value={product.price} onChange={e => setProduct({...product, price: e.target.value})} required style={{ padding: '10px' }} />
        <input type="text" placeholder="Link ảnh" value={product.image} onChange={e => setProduct({...product, image: e.target.value})} style={{ padding: '10px' }} />
        <textarea placeholder="Mô tả" value={product.description} onChange={e => setProduct({...product, description: e.target.value})} style={{ padding: '10px', height: '100px' }} />
        <button type="submit" style={{ padding: '12px', backgroundColor: '#0056b3', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Lưu sản phẩm</button>
      </form>
    </div>
  );
};

export default ProductForm;