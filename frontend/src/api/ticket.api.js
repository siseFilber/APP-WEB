import client from './client';

// 1. Obtener los tickets del cliente logueado (Mis Tickets)
export const getMyTicketsRequest = () => client.get('/tickets/my-tickets');

// 2. Crear un nuevo ticket (Soporte)
export const createTicketRequest = (ticket) => client.post('/tickets', ticket);

// 3. Obtener todos los tickets (Panel de Operaciones - Admin/Tech)
export const getTicketsRequest = () => client.get('/tickets');

// 4. Asignar técnico o Tomar Misión
export const assignTechRequest = (id, techId) => client.patch(`/tickets/${id}/assign`, { techId });

// 5. Agregar servicios del catálogo al ticket (Cobros extra)
export const addServiceToTicketRequest = (id, serviceId) => client.post(`/tickets/${id}/services`, { serviceId });

// 6. ACTUALIZAR ESTADO (La más importante para el flujo de cierre)
// Se usa para: 'IN_PROGRESS', 'READY_FOR_REVIEW' (Técnico) y 'CLOSED' (Cliente)
export const updateTicketStatusRequest = (id, status) => client.patch(`/tickets/${id}/status`, { status });

// 7. Obtener detalle de un ticket específico
export const getTicketDetailRequest = (id) => client.get(`/tickets/${id}`);

// 8. ELIMINAR O CANCELAR TICKET (Lo que faltaba)
// Útil para limpiezas de base de datos o cancelaciones por el Admin
export const deleteTicketRequest = (id) => client.delete(`/tickets/${id}`);