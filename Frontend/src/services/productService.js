import axiosClient from '../api/axiosClient';

const productService = {
  // 1. Lấy toàn bộ danh sách sản phẩm từ database
  // Tương ứng GET /api/v1/products
  getAll: () => {
    return axiosClient.get('/api/v1/products');
  },

  // 2. Lấy thông tin chi tiết của một sản phẩm cụ thể theo ID
  // Tương ứng GET /api/v1/products/{id}
  getById: (id) => {
    return axiosClient.get(`/api/v1/products/${id}`);
  },

  // 3. Tìm kiếm sản phẩm theo tên (dùng cho thanh Search ở Header)
  // Tương ứng GET /api/v1/products/search?name={name}
  searchByName: (name) => {
    return axiosClient.get(`/api/v1/products/search?name=${name}`);
  }
};

export default productService;