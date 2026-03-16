import client from './client';

// 1. Ver TODOS los servicios de la plataforma (Público/Cliente)
export const getAllServicesRequest = () => client.get('/services');

// 2. Ver solo MIS servicios (Solo para el técnico logueado)
export const getMyServicesRequest = () => client.get('/services/my-services');

// 3. Crear un nuevo servicio (TECH o ADMIN)
export const createServiceRequest = (service) => client.post('/services', service);

// 4. Actualizar un servicio (TECH o ADMIN)
export const updateServiceRequest = (id, service) => client.put(`/services/${id}`, service);

// 5. Eliminar un servicio (TECH o ADMIN)
export const deleteServiceRequest = (id) => client.delete(`/services/${id}`);