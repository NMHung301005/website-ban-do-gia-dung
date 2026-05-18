import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // URL mới của Backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Tự động gắn Token vào mọi request gửi đi
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Xử lý lỗi trả về (ví dụ hết hạn Token)
axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosClient;