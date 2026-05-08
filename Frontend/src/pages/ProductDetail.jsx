import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import cartService from '../services/cartService';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const data = await productService.getById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [id]);

  // Hàm xử lý Thêm vào giỏ hàng
  const handleAddToCart = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert("Bạn cần đăng nhập để mua hàng!");
      navigate('/login');
      return;
    }

    try {
      // Gọi API POST /api/v1/cart/add/{productId}
      await cartService.add(product.id);
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error) {
      console.error(error);
      alert("Thêm vào giỏ hàng thất bại. Vui lòng thử lại.");
    }
  };

  // Hàm xử lý Mua ngay (Thêm vào giỏ rồi chuyển thẳng sang trang Cart)
  const handleBuyNow = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert("Bạn cần đăng nhập để mua hàng!");
      navigate('/login');
      return;
    }

    try {
      await cartService.add(product.id);
      navigate('/cart'); // Chuyển sang trang giỏ hàng
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div style={{ padding: '40px' }}>Đang tải...</div>;
  if (!product) return <div style={{ padding: '40px' }}>Không tìm thấy sản phẩm.</div>;

  const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price || 0);
  const productImage = product.image || product.imageUrl || 'https://via.placeholder.com/400x400?text=Chua+Co+Anh';

  return (
    <div style={{ display: 'flex', gap: '40px', padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ flex: '1' }}>
        <img src={productImage} alt={product.name} style={{ width: '100%', borderRadius: '8px', border: '1px solid #eaeaea' }} />
      </div>
      
      <div style={{ flex: '1.5', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '26px', marginBottom: '15px' }}>{product.name}</h1>
        <div style={{ backgroundColor: '#fafafa', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
          <p style={{ color: '#d0021b', fontSize: '32px', fontWeight: 'bold', margin: '0' }}>{formattedPrice}</p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Đặc điểm nổi bật</h3>
          <p style={{ lineHeight: '1.6' }}>{product.description || 'Chưa có mô tả chi tiết.'}</p>
        </div>
        
        {/* Đã gắn sự kiện onClick cho 2 nút bấm */}
        <div style={{ display: 'flex', gap: '15px', marginTop: 'auto' }}>
          <button onClick={handleAddToCart} style={{ flex: 1, padding: '15px', backgroundColor: '#fff', color: '#0056b3', border: '1px solid #0056b3', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Thêm vào giỏ hàng
          </button>
          <button onClick={handleBuyNow} style={{ flex: 1, padding: '15px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;