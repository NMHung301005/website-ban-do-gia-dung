import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080', 
  headers: {
    'Content-Type': 'application/json',
  },
  // Tạm thời bỏ withCredentials nếu Backend chưa cấu hình CORS cho nó
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data; 
  },
  (error) => {
    // In lỗi ra để mình kiểm tra nếu vẫn không hiện sản phẩm
    console.error("Lỗi kết nối Backend:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;