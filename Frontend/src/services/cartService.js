import axiosClient from '../api/axiosClient';

const cartService = {
  getCart: () => {
    return axiosClient.get('/cart');
  },
  add: (productId) => {
    return axiosClient.post(`/cart/add/${productId}`);
  },
  remove: (itemId) => {
    return axiosClient.delete(`/cart/${itemId}`);
  },
  updateQuantity: (itemId, quantity) => {
    return axiosClient.put(`/cart/update/${itemId}?quantity=${quantity}`);
  }
};

export default cartService;