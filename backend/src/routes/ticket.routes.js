const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');
const { validateToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/role.middleware');

// --- 1. RUTAS DE CLIENTE ---
// Crear un nuevo ticket (Soporte)
router.post('/', validateToken, checkRole(['CLIENT', 'ADMIN']), ticketController.createTicket);

// Ver historial de tickets propios (Mis Tickets)
router.get('/my-tickets', validateToken, checkRole(['CLIENT']), ticketController.getMyTickets);

// --- 2. RUTAS DE CONSULTA (ADMIN/TECH) ---
// Ver todos los tickets del sistema (Panel de Operaciones)
router.get('/', validateToken, checkRole(['ADMIN', 'TECH']), ticketController.getAllTickets);

// Ver el detalle de un ticket específico (Incluye servicios vinculados)
router.get('/:id', validateToken, checkRole(['ADMIN', 'TECH']), ticketController.getTicketDetail);

// --- 3. GESTIÓN DE OPERACIONES (TECH/ADMIN) ---
// Asignar técnico o auto-asignarse la misión
router.patch('/:id/assign', validateToken, checkRole(['ADMIN', 'TECH']), ticketController.assignTechnician);

// Vincular servicios del catálogo al ticket (Ej: "Formateo" sumado al ticket)
router.post('/:id/services', validateToken, checkRole(['TECH', 'ADMIN']), ticketController.addServiceToTicket);

// --- 4. ACTUALIZACIÓN DE ESTADO (CLIENT/TECH/ADMIN) ---
// Cambiado: Ahora CLIENT también entra para poder CERRAR el ticket
router.patch('/:id/status', validateToken, checkRole(['TECH', 'ADMIN', 'CLIENT']), ticketController.updateTicketStatus);

// --- 5. ELIMINACIÓN (Solo ADMIN) ---
router.delete('/:id', validateToken, checkRole(['ADMIN']), ticketController.deleteTicket);

module.exports = router;