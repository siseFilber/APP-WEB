import client from './client';

// 1. Ver TODOS los servicios de la plataforma (Público/Cliente)
export const getAllServicesRequest = () => client.get('/services');

// 2. Ver solo MIS servicios (Panel del Técnico - Filtra por Token)
export const getMyServicesRequest = () => client.get('/services/my-services');

// 3. Obtener un servicio específico por ID (Para formularios de edición)
export const getServiceRequest = (id) => client.get(`/services/${id}`);

// 4. Crear un nuevo servicio (Rol: TECH o ADMIN)
export const createServiceRequest = (service) => client.post('/services', service);

// 5. Actualizar un servicio (Rol: TECH o ADMIN)
export const updateServiceRequest = (id, service) => client.put(`/services/${id}`, service);

// 6. Eliminar un servicio (Rol: TECH o ADMIN)
export const deleteServiceRequest = (id) => client.delete(`/services/${id}`);

// 7. Obtener lista de técnicos (Para el Administrador)
export const getTechUsersRequest = () => client.get('/services/tecnicos');