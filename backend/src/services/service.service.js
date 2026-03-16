const { prisma } = require('../config/db');

// Obtener todos los servicios (útil para el administrador)
const getAllServices = async () => {
    return await prisma.service.findMany({
        include: { technician: true } // Para saber quién ofrece qué
    });
};

// Obtener los servicios de UN técnico específico (Para su panel de control)
const getServicesByTech = async (techId) => {
    return await prisma.service.findMany({
        where: { techId: Number(techId) }
    });
};

// Crear servicio vinculado a un técnico
const createService = async (techId, data) => {
    return await prisma.service.create({
        data: {
            name: data.name,
            price: parseFloat(data.price),
            description: data.description,
            techId: Number(techId) // <--- Aquí vinculamos al técnico
        }
    });
};

const updateService = async (id, data) => {
    return await prisma.service.update({
        where: { id: Number(id) },
        data: {
            ...data,
            price: data.price ? parseFloat(data.price) : undefined
        }
    });
};

const deleteService = async (id) => {
    return await prisma.service.delete({
        where: { id: Number(id) }
    });
};
const getTechUsers = async (req, res) => {
    try {
        const techs = await userService.getTechUsersService();
        res.status(200).json(techs);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la lista de técnicos" });
    }
};

module.exports = {
    getAllServices,
    getServicesByTech, // Agregado
    createService,
    updateService,
    deleteService,
    getTechUsers
};