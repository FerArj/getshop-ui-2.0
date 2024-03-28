import axios from "axios";

const ip = {
  local: "localhost",
  debian: "192.168.0.195",
  ec2: "3.91.11.40"
}

const api = axios.create({
  baseURL: `http://${ip.ec2}:8080`,
  timeout: 1000,
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    const tokenLoja = sessionStorage.getItem('tokenLoja');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (tokenLoja) {
      config.headers.Authorization = `Bearer ${tokenLoja}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;