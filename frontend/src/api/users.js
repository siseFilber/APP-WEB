import client from "./client";

// --- RUTAS DE AUTENTICACIÓN ---

export const registerRequest = (user) => client.post("/users/register", user);
export const loginRequest = (user) => client.post("/users/login", user);
export const verifyOTPRequest = (data) => client.post("/users/verify-otp", data);
export const resendOTPRequest = (email) => client.post("/users/resend-otp", { email });

// --- RUTAS DE PERFIL Y GESTIÓN PROPIA (PRIVADAS) ---

export const getProfileRequest = () => client.get("/users/profile");
export const updateProfileRequest = (data) => client.put("/users/profile", data);

/**
 * SOLUCIÓN ERROR 500: Obtiene los servicios del técnico logueado.
 * El backend usará el token para saber quién es.
 */
export const getMyServicesRequest = () => client.get("/users/my-services");


// --- RUTAS DE STAFF (PÚBLICAS PARA EL CATÁLOGO) ---

export const getTechUsersRequest = () => client.get('/users/tech/all');
export const getTechProfileRequest = (id) => client.get(`/users/tech/profile/${id}`);
export const getUserServicesRequest = (id) => client.get(`/users/tech/services/${id}`);


// --- RUTAS DE ADMINISTRACIÓN (SOLO ADMIN) ---

/**
 * Obtiene técnicos que ya verificaron correo pero esperan aprobación (WAITING_ADMIN)
 */
export const getPendingTechsRequest = () => client.get("/users/admin/pending");

/**
 * Obtiene la lista completa de usuarios (Para gestión general)
 */
export const getAllUsersRequest = () => client.get("/users");

export const changeRoleRequest = (id, role) => client.patch(`/users/${id}/role`, { role });
export const updateStatusRequest = (id, status) => client.patch(`/users/${id}/status`, { status });
export const deleteUserRequest = (id) => client.delete(`/users/${id}`);