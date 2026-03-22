import client from './client';

// --- RUTAS PÚBLICAS (Sin Token / Autenticación) ---
export const registerRequest = (user) => client.post('/users/register', user);
export const loginRequest = (user) => client.post('/users/login', user);
export const verifyOTPRequest = (data) => client.post('/users/verify-otp', data);
export const resendOTPRequest = (email) => client.post('/users/resend-otp', { email });

// --- RUTAS PÚBLICAS (Visualización para Clientes) ---
// Obtener lista de técnicos activos
export const getTechUsersRequest = () => client.get('/users/tecnicos');

// NUEVA: Obtener los servicios específicos de un técnico por su ID
export const getUserServicesRequest = (id) => client.get(`/users/${id}/services`);

// NUEVA: Obtener perfil completo del técnico (Data + Servicios)
export const getTechProfileRequest = (id) => client.get(`/users/tecnicos/${id}`);


// --- RUTAS PRIVADAS (Cualquier usuario logueado) ---
export const getProfileRequest = () => client.get('/users/profile');
export const updateProfileRequest = (data) => client.put('/users/profile', data);


// --- RUTAS DE ADMINISTRACIÓN (Solo ADMIN) ---
// 1. Listar todos los usuarios del sistema
export const getAllUsersRequest = () => client.get('/users');

// 2. Detalle de un usuario específico
export const getUserDetailRequest = (id) => client.get(`/users/${id}`);

// 3. Cambiar estado (Aprobar/Banear/Activar)
export const updateUserStatusRequest = (id, status) => 
    client.patch(`/users/${id}/status`, { status });

// 4. Cambiar Rol (Ej: Ascender CLIENT a TECH)
export const updateUserRoleRequest = (id, role) => 
    client.patch(`/users/${id}/role`, { role });

// 5. Eliminar usuario permanentemente
export const deleteUserRequest = (id) => client.delete(`/users/${id}`);