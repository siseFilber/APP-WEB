import client from "./client";

// --- RUTAS DE AUTENTICACIÓN ---

/**
 * Registra un nuevo usuario (Cliente o Técnico)
 */
export const registerRequest = (user) => client.post("/users/register", user);

/**
 * Inicia sesión y obtiene el Token JWT
 */
export const loginRequest = (user) => client.post("/users/login", user);

/**
 * Verifica la cuenta mediante el código OTP enviado al correo
 */
export const verifyOTPRequest = (data) => client.post("/users/verify-otp", data);

/**
 * Solicita un nuevo código de verificación
 */
export const resendOTPRequest = (email) => client.post("/users/resend-otp", { email });


// --- RUTAS DE PERFIL (PRIVADAS) ---

/**
 * Obtiene los datos del usuario logueado (usa el token del interceptor)
 */
export const getProfileRequest = () => client.get("/users/profile");

/**
 * Actualiza los datos básicos del perfil (DNI, Nombre, Email)
 */
export const updateProfileRequest = (data) => client.put("/users/profile", data);


// --- RUTAS DE STAFF (PÚBLICAS PARA EL CATÁLOGO) ---

/**
 * Lista todos los técnicos con status 'ACTIVE'
 */
export const getTechUsersRequest = () => client.get("/users/tecnicos");

/**
 * Obtiene el perfil detallado de un técnico por su ID
 */
export const getTechProfileRequest = (id) => client.get(`/users/tecnicos/${id}`);

/**
 * Obtiene la lista de servicios asociados a un técnico específico
 */
export const getUserServicesRequest = (id) => client.get(`/users/${id}/services`);


// --- RUTAS DE ADMINISTRACIÓN (SOLO ADMIN) ---

/**
 * Obtiene la lista completa de usuarios del sistema
 */
export const getAllUsersRequest = () => client.get("/users");

/**
 * Actualiza el rol de un usuario (Ej: de CLIENT a TECH)
 */
export const changeRoleRequest = (id, role) => client.patch(`/users/${id}/role`, { role });

/**
 * Actualiza el estado de un usuario (Ej: ACTIVE, PENDING, BANNED)
 */
export const updateStatusRequest = (id, status) => client.patch(`/users/${id}/status`, { status });

/**
 * Elimina un usuario de la base de datos
 */
export const deleteUserRequest = (id) => client.delete(`/users/${id}`);