const ticketService = require('../services/ticket.service');

const createTicket = async (req, res) => {
    try {
        // Inyectamos el ID del cliente desde el token
        const data = { ...req.body, clientId: req.user.id };
        const newTicket = await ticketService.createTicketService(data);
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getMyTickets = async (req, res) => {
    try {
        const tickets = await ticketService.getTicketsByClient(req.user.id);
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllTickets = async (req, res) => {
    try {
        const tickets = await ticketService.getAllTicketsService();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTicketDetail = async (req, res) => {
    try {
        const ticket = await ticketService.getTicketById(req.params.id);
        if (!ticket) return res.status(404).json({ error: "Ticket no encontrado" });
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const assignTechnician = async (req, res) => {
    try {
        const { techId } = req.body;
        const updated = await ticketService.assignTechService(req.params.id, techId);
        res.json({ message: "Técnico asignado correctamente", ticket: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateTicketStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await ticketService.updateStatusService(req.params.id, status);
        res.json({ message: "Estado actualizado", ticket: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addServiceToTicket = async (req, res) => {
    try {
        const { serviceId } = req.body;
        const updated = await ticketService.addServiceToTicketService(req.params.id, serviceId);
        res.json({ message: "Servicio agregado al ticket", ticket: updated });
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
    addServiceToTicket
};