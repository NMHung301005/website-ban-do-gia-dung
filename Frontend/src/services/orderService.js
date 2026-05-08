import axiosClient from '../api/axiosClient';

const orderService = {
  checkout: (orderData) => {
    // orderData chứa thông tin giao hàng, SĐT, v.v.
    return axiosClient.post('/api/v1/orders/checkout', orderData);
  }
};

export default orderService;