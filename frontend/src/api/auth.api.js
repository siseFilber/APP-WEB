import client from './client';

// Registro de nuevos usuarios (Clientes/Técnicos)
export const registerRequest = (user) => client.post('/users/register', user);

// Verificación de cuenta con el código enviado al correo
export const verifyOtpRequest = (data) => client.post('/users/verify-otp', data);

// Inicio de sesión para obtener el Token
export const loginRequest = (credentials) => client.post('/users/login', credentials);

// Obtener los datos del usuario logueado (incluyendo su rol)
export const getProfileRequest = () => client.get('/users/profile');

// Reenviar código si no llegó
export const resendOtpRequest = (email) => client.post('/users/resend-otp', { email });