import axiosClient from '../api/axiosClient';

const adminService = {
  // --- QUẢN LÝ SẢN PHẨM ---
  addProduct: (productData) => {
    return axiosClient.post('/admin/products', productData);
  },
  updateProduct: (id, productData) => {
    return axiosClient.put(`/admin/products/${id}`, productData);
  },
  deleteProduct: (id) => {
    return axiosClient.delete(`/admin/products/${id}`);
  },

  // --- QUẢN LÝ ĐƠN HÀNG ---
  getAllOrders: () => {
    return axiosClient.get('/admin/orders');
  },
  updateOrderStatus: (id, status) => {
    // Truyền status qua query parameter
    return axiosClient.put(`/admin/orders/${id}?status=${status}`);
  }
};

export default adminService;