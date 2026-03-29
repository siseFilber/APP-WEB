const { prisma } = require('../config/db');

/**
 * 1. CREAR TICKET (Iniciado por Cliente)
 */
const createTicketService = async (data) => {
    return await prisma.ticket.create({
        data: {
            title: data.title,
            description: data.description,
            priority: data.priority || "NORMAL",
            status: "OPEN", // Estado inicial
            clientId: Number(data.clientId) 
        }
    });
};

/**
 * 2. OBTENER TICKETS DE UN CLIENTE (Historial del Cliente)
 */
const getTicketsByClient = async (clientId) => {
    return await prisma.ticket.findMany({
        where: { clientId: Number(clientId) },
        include: { 
            technician: { select: { name: true, email: true } },
            services: true // Ver qué servicios se le están aplicando
        },
        orderBy: { createdAt: 'desc' }
    });
};

/**
 * 3. OBTENER TODOS LOS TICKETS (Para el Panel del Técnico/NOC)
 */
const getAllTicketsService = async () => {
    return await prisma.ticket.findMany({
        include: {
            client: { select: { name: true, email: true, dni: true } },
            technician: { select: { name: true } },
            services: { select: { name: true, price: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
};

/**
 * 4. DETALLE DE UN TICKET POR ID
 */
const getTicketById = async (id) => {
    return await prisma.ticket.findUnique({
        where: { id: Number(id) },
        include: {
            client: true,
            technician: true,
            services: true 
        }
    });
};

/**
 * 5. ASIGNAR TÉCNICO (Misión Tomada)
 */
const assignTechService = async (ticketId, techId) => {
    return await prisma.ticket.update({
        where: { id: Number(ticketId) },
        data: {
            techId: Number(techId),
            status: "IN_PROGRESS"
        }
    });
};

/**
 * 6. ACTUALIZAR ESTADO (Flujo: READY_FOR_REVIEW -> CLOSED)
 */
const updateStatusService = async (id, status) => {
    return await prisma.ticket.update({
        where: { id: Number(id) },
        data: { status }
    });
};

/**
 * 7. VINCULAR SERVICIO AL TICKET (Añadir ítems de cobro)
 */
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

/**
 * 8. ELIMINAR O CANCELAR TICKET
 */
const deleteTicketService = async (id) => {
    return await prisma.ticket.delete({
        where: { id: Number(id) }
    });
};

module.exports = {
    createTicketService,
    getTicketsByClient,
    getAllTicketsService,
    getTicketById,
    assignTechService,
    updateStatusService,
    addServiceToTicketService,
    deleteTicketService
};