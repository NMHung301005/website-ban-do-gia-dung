import axiosClient from '../api/axiosClient';

const orderService = {
  // Hàm 1: Gọi API để tiến hành thanh toán (Checkout)
  checkout: () => {
    return axiosClient.post('/orders/checkout');
  },
  
  // Hàm 2: Gọi API lấy lịch sử đơn hàng của User đang đăng nhập
  getMyOrders: () => {
    return axiosClient.get('/orders');
  }
};

export default orderService;