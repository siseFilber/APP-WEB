import axios from 'axios';

const client = axios.create({
  // Asegúrate de que esta URL sea la de tu backend real
  baseURL: 'https://filberdev.cloud/api', 
  withCredentials: true
});

// INTERCEPTOR: Antes de enviar la petición al servidor...
client.interceptors.request.use(
  (config) => {
    // 1. Buscamos el token en el almacenamiento del navegador
    const token = localStorage.getItem('token');
    
    // 2. Si existe, lo metemos en la cabecera de la petición
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;