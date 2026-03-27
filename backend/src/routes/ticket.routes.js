const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');
const { validateToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/role.middleware');

// --- RUTAS DE CLIENTE ---
router.post('/', validateToken, checkRole(['CLIENT','ADMIN']), ticketController.createTicket);
router.get('/my-tickets', validateToken, checkRole(['CLIENT']), ticketController.getMyTickets);

// --- RUTAS DE CONSULTA (ADMIN/TECH) ---
router.get('/', validateToken, checkRole(['ADMIN', 'TECH']), ticketController.getAllTickets);
router.get('/:id', validateToken, checkRole(['ADMIN', 'TECH']), ticketController.getTicketDetail);

// --- RUTAS DE ADMINISTRADOR ---
router.patch('/:id/assign', validateToken, checkRole(['ADMIN','TECH']), ticketController.assignTechnician);

// --- RUTAS DE TÉCNICO ---
router.patch('/:id/status', validateToken, checkRole(['TECH', 'ADMIN']), ticketController.updateTicketStatus);
router.post('/:id/services', validateToken, checkRole(['TECH', 'ADMIN']), ticketController.addServiceToTicket);

module.exports = router;