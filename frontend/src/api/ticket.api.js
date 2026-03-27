import client from './client';

// 1. Obtener los tickets del cliente logueado
export const getMyTicketsRequest = () => client.get('/tickets/my-tickets');

// 2. Crear un nuevo ticket
export const createTicketRequest = (ticket) => client.post('/tickets', ticket);

// 3. Obtener todos los tickets (Admin/Tech)
export const getTicketsRequest = () => client.get('/tickets');

// 4. Asignar técnico (Solo Admin)
export const assignTechRequest = (id, techId) => client.patch(`/tickets/${id}/assign`, { techId });

// 5. Agregar servicios extra al ticket (Técnico)
export const addServiceToTicketRequest = (id, serviceId) => client.post(`/tickets/${id}/services`, { serviceId });

// 6. Actualizar estado del ticket (Técnico)
export const updateTicketStatusRequest = (id, status) => client.patch(`/tickets/${id}/status`, { status });

// 7. Obtener detalle de un ticket específico
export const getTicketDetailRequest = (id) => client.get(`/tickets/${id}`);