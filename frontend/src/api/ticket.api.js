import client from './client';

export const getTicketsRequest = () => client.get('/tickets');
export const createTicketRequest = (ticket) => client.post('/tickets', ticket);
export const assignTechRequest = (id, techId) => client.patch(`/tickets/${id}/assign`, { techId });
export const addServiceToTicketRequest = (id, serviceId) => client.post(`/tickets/${id}/services`, { serviceId });