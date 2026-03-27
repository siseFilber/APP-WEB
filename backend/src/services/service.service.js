const { prisma } = require('../config/db');

const getAllServices = async () => {
    return await prisma.service.findMany({
        include: { technician: { select: { id: true, name: true, email: true } } }
    });
};

const getServiceById = async (id) => {
    return await prisma.service.findUnique({
        where: { id: Number(id) },
        include: { technician: { select: { id: true, name: true, email: true } } }
    });
};

const getServicesByTech = async (techId) => {
    return await prisma.service.findMany({
        where: { techId: Number(techId) }
    });
};

const createService = async (techId, data) => {
    return await prisma.service.create({
        data: {
            name: data.name,
            price: parseFloat(data.price),
            description: data.description,
            techId: Number(techId)
        }
    });
};

const updateService = async (id, data) => {
    return await prisma.service.update({
        where: { id: Number(id) },
        data: {
            name: data.name,
            price: data.price ? parseFloat(data.price) : undefined,
            description: data.description
        }
    });
};

const deleteService = async (id) => {
    return await prisma.service.delete({
        where: { id: Number(id) }
    });
};

const getTechUsersService = async () => {
    return await prisma.user.findMany({
        where: { role: 'TECH' },
        select: { id: true, name: true, email: true, status: true }
    });
};

module.exports = {
    getAllServices,
    getServiceById,
    getServicesByTech,
    createService,
    updateService,
    deleteService,
    getTechUsersService
};