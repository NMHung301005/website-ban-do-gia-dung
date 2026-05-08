import axiosClient from '../api/axiosClient';

const authService = {
  register: (data) => {
    // Gọi API POST tới endpoint đăng ký của Spring Boot
    return axiosClient.post('/api/v1/auth/register', data);
  },
  login: (data) => {
    // Gọi API POST tới endpoint đăng nhập của Spring Boot
    return axiosClient.post('/api/v1/auth/login', data);
  }
};

export default authService;