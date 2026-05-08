import axiosClient from '../api/axiosClient';

const adminService = {
  // --- QUẢN LÝ SẢN PHẨM ---
  addProduct: (productData) => {
    return axiosClient.post('/api/v1/admin/products', productData);
  },
  updateProduct: (id, productData) => {
    return axiosClient.put(`/api/v1/admin/products/${id}`, productData);
  },
  deleteProduct: (id) => {
    return axiosClient.delete(`/api/v1/admin/products/${id}`);
  },

  // --- QUẢN LÝ ĐƠN HÀNG ---
  getAllOrders: () => {
    return axiosClient.get('/api/v1/admin/orders');
  },
  updateOrderStatus: (id, status) => {
    // Truyền status qua query parameter
    return axiosClient.put(`/api/v1/admin/orders/${id}?status=${status}`);
  }
};

export default adminService;