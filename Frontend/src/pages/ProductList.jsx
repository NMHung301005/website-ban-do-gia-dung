import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productService from '../services/productService';

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let data = [];

        // Nếu có tìm kiếm bằng từ khóa, gọi API search
        if (searchQuery) {
          data = await productService.searchByName(searchQuery);
        } else {
          // Ngược lại lấy tất cả
          data = await productService.getAll();
        }

        // Lọc danh mục ở Frontend (nếu người dùng bấm vào danh mục)
        if (categoryQuery) {
          data = data.filter(item => 
            // Kiểm tra trường category của backend (nếu có), 
            // hoặc tạm thời lọc theo tên sản phẩm có chứa từ khóa danh mục
            (item.category && item.category.name === categoryQuery) ||
            (item.name && item.name.toLowerCase().includes(categoryQuery.toLowerCase()))
          );
        }

        setProducts(data);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu:", err);
        setError("Không thể tải sản phẩm lúc này. Vui lòng kiểm tra lại server.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryQuery, searchQuery]); // Bắt sự kiện mỗi khi URL thay đổi

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>
        {categoryQuery ? `Danh mục: ${categoryQuery}` : searchQuery ? `Kết quả cho: "${searchQuery}"` : 'Tất cả sản phẩm'}
      </h2>
      
      {loading && <p>Đang tải dữ liệu từ server...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Không tìm thấy sản phẩm nào phù hợp.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;