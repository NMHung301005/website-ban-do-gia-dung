import axiosClient from '../api/axiosClient';

const cartService = {
  getCart: () => {
    return axiosClient.get('/api/v1/cart');
  },
  add: (productId) => {
    return axiosClient.post(`/api/v1/cart/add/${productId}`);
  },
  remove: (itemId) => {
    return axiosClient.delete(`/api/v1/cart/${itemId}`);
  },
  updateQuantity: (itemId, quantity) => {
    return axiosClient.put(`/api/v1/cart/update/${itemId}?quantity=${quantity}`);
  }
};

export default cartService;