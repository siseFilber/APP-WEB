const { prisma } = require('../config/db');

// 1. Crear el ticket (Relación con Cliente)
const createTicketService = async (data) => {
    return await prisma.ticket.create({
        data: {
            title: data.title,
            description: data.description,
            priority: data.priority || "NORMAL",
            clientId: data.clientId
        }
    });
};

// 2. Obtener tickets de un cliente específico
const getTicketsByClient = async (clientId) => {
    return await prisma.ticket.findMany({
        where: { clientId: Number(clientId) },
        include: { technician: { select: { name: true } } }, // Para saber quién lo atiende
        orderBy: { createdAt: 'desc' }
    });
};

// 3. Obtener todos los tickets (Admin/Tech)
const getAllTicketsService = async () => {
    return await prisma.ticket.findMany({
        include: {
            client: { select: { name: true, email: true } },
            technician: { select: { name: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
};

// 4. Detalle completo de un ticket (Incluye los servicios cobrados)
const getTicketById = async (id) => {
    return await prisma.ticket.findUnique({
        where: { id: Number(id) },
        include: {
            client: true,
            technician: true,
            services: true // Trae la lista de reparaciones hechas (Formateo, etc.)
        }
    });
};

// 5. Asignar Técnico y cambiar estado a En Progreso
const assignTechService = async (ticketId, techId) => {
    return await prisma.ticket.update({
        where: { id: Number(ticketId) },
        data: {
            techId: Number(techId),
            status: "IN_PROGRESS"
        }
    });
};

// 6. Actualizar solo el estado (OPEN, IN_PROGRESS, RESOLVED, CLOSED)
const updateStatusService = async (id, status) => {
    return await prisma.ticket.update({
        where: { id: Number(id) },
        data: { status }
    });
};

// 7. Vincular un servicio del catálogo al ticket
const addServiceToTicketService = async (ticketId, serviceId) => {
    return await prisma.ticket.update({
        where: { id: Number(ticketId) },
        data: {
            services: {
                connect: { id: Number(serviceId) }
            }
        },
        include: { services: true }
    });
};

module.exports = {
    createTicketService,
    getTicketsByClient,
    getAllTicketsService,
    getTicketById,
    assignTechService,
    updateStatusService,
    addServiceToTicketService
};