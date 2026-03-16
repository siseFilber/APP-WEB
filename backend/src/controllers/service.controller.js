const serviceService = require('../services/service.service');

// 1. Ver MIS servicios (Para el técnico logueado)
const getMyServices = async (req, res) => {
    try {
        const techId = req.user.id; // Viene del authMiddleware
        const services = await serviceService.getServicesByTech(techId);
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Agregar un servicio vinculado a MÍ
const addService = async (req, res) => {
    try {
        const techId = req.user.id; // Vinculamos automáticamente al técnico
        const newService = await serviceService.createService(techId, req.body);
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateExistingService = async (req, res) => {
    try {
        // Podrías validar aquí que el servicio pertenezca al techId antes de editar
        const updated = await serviceService.updateService(req.params.id, req.body);
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const removeService = async (req, res) => {
    try {
        await serviceService.deleteService(req.params.id);
        res.json({ message: "Servicio eliminado correctamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 3. Ver TODOS (Opcional, para la lista general de técnicos)
const getServices = async (req, res) => {
    try {
        const services = await serviceService.getAllServices();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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
    getMyServices, // Lo que usará el técnico en su panel
    getServices,   // Lo que usará el cliente para ver todo
    addService,
    updateExistingService,
    removeService,
    getTechUsers
};