const ticketService = require('../services/ticket.service');

// 1. CREAR TICKET (Cliente)
const createTicket = async (req, res) => {
  try {
    // Extraemos el clientId del token para mayor seguridad
    const ticketData = {
      ...req.body,
      clientId: req.user.id 
    };
    
    const newTicket = await ticketService.createTicketService(ticketData);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 2. MIS TICKETS (Vista del Cliente)
const getMyTickets = async (req, res) => {
    try {
        const tickets = await ticketService.getTicketsByClient(req.user.id);
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. TODOS LOS TICKETS (Vista del Técnico / NOC)
const getAllTickets = async (req, res) => {
    try {
        const tickets = await ticketService.getAllTicketsService();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. DETALLE DE TICKET
const getTicketDetail = async (req, res) => {
    try {
        const ticket = await ticketService.getTicketById(req.params.id);
        if (!ticket) return res.status(404).json({ error: "Ticket no encontrado" });
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. ASIGNAR TÉCNICO
const assignTechnician = async (req, res) => {
    try {
        const { techId } = req.body;
        // Si techId no viene en el body, lo tomamos del token (el técnico se auto-asigna)
        const finalTechId = techId || req.user.id;
        
        const updated = await ticketService.assignTechService(req.params.id, finalTechId);
        res.json({ message: "Misión aceptada", ticket: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 6. ACTUALIZAR ESTADO (Realizado / Cerrado)
const updateTicketStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await ticketService.updateStatusService(req.params.id, status);
        res.json({ message: `Ticket actualizado a ${status}`, ticket: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 7. VINCULAR SERVICIO COMERCIAL AL TICKET
const addServiceToTicket = async (req, res) => {
    try {
        const { serviceId } = req.body;
        const updated = await ticketService.addServiceToTicketService(req.params.id, serviceId);
        res.json({ message: "Servicio vinculado", ticket: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 8. ELIMINAR TICKET (Admin)
const deleteTicket = async (req, res) => {
    try {
        await ticketService.deleteTicketService(req.params.id);
        res.json({ message: "Ticket eliminado permanentemente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createTicket,
    getMyTickets,
    getAllTickets,
    getTicketDetail,
    assignTechnician,
    updateTicketStatus,
    addServiceToTicket,
    deleteTicket
};