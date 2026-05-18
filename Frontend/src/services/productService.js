import axiosClient from '../api/axiosClient';

const productService = {
  getAll: () => {
    return axiosClient.get('/products');
  },
  
  getById: (id) => {
    return axiosClient.get(`/products/${id}`);
  },

  // --- HÀM MỚI: TÌM KIẾM & LỌC SẢN PHẨM PHÂN TRANG ---
  searchProducts: (name, minPrice, maxPrice, page = 0, size = 6) => {
    const params = new URLSearchParams();
    if (name) params.set('name', name);       // Khớp với API backend
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    params.set('page', page);
    params.set('size', size);

    return axiosClient.get(`/products/search?${params.toString()}`); //
  }
};

export default productService;