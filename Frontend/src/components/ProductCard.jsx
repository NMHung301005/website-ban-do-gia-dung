import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Hàm định dạng tiền tệ VNĐ
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price || 0);
  };

  // Xử lý ảnh: Nếu database trống (null/empty) thì dùng ảnh placeholder
  const productImage = (product.image && product.image.trim() !== '') 
    ? product.image 
    : 'https://placehold.co/400x400/e6f0ff/0056b3?text=HomeMart';

  return (
    <div className="product-card" style={{ 
      border: '1px solid #f0f0f0', 
      borderRadius: '10px', 
      padding: '15px', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      height: '100%', 
      backgroundColor: '#fff',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ width: '100%', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
          <img 
            src={productImage} 
            alt={product.name} 
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '4px' }} 
          />
        </div>
        
        <h4 style={{ 
          fontSize: '15px', 
          margin: '0 0 10px 0', 
          minHeight: '42px', 
          lineHeight: '1.4', 
          color: '#333',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.name}
        </h4>
      </Link>

      <div style={{ marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
          <span style={{ color: '#ffc107', fontSize: '14px' }}>★★★★★</span>
          <span style={{ fontSize: '12px', color: '#999' }}>(12)</span>
        </div>
        
        <p style={{ color: '#d0021b', fontWeight: 'bold', fontSize: '18px', margin: '0' }}>
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;