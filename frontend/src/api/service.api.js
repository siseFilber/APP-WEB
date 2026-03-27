import client from './client';

// 1. Ver TODOS los servicios de la plataforma (Público/Cliente)
export const getAllServicesRequest = () => client.get('/services');

// 2. Ver solo MIS servicios (Solo para el técnico logueado)
export const getMyServicesRequest = () => client.get('/services/my-services');

// 3. Obtener un servicio específico por ID (¡ESTA ES LA QUE PIDE EL BUILD!)
export const getServiceRequest = (id) => client.get(`/services/${id}`);

// 4. Crear un nuevo servicio (TECH o ADMIN)
export const createServiceRequest = (service) => client.post('/services', service);

// 5. Actualizar un servicio (TECH o ADMIN)
export const updateServiceRequest = (id, service) => client.put(`/services/${id}`, service);

// 6. Eliminar un servicio (TECH o ADMIN)
export const deleteServiceRequest = (id) => client.delete(`/services/${id}`);