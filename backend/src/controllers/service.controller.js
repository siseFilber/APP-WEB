const serviceService = require('../services/service.service');

// 1. Obtener todos los servicios
const getServices = async (req, res) => {
    try {
        const services = await serviceService.getAllServices();
        res.json(services);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

// 2. Obtener un servicio por ID (Soluciona el error 404/undefined)
const getServiceById = async (req, res) => {
    try {
        const service = await serviceService.getServiceById(req.params.id);
        if (!service) return res.status(404).json({ message: "Servicio no encontrado" });
        res.json(service);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

// 3. Ver MIS servicios (Panel del técnico)
const getMyServices = async (req, res) => {
    try {
        const services = await serviceService.getServicesByTech(req.user.id);
        res.json(services);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

// 4. Agregar servicio
const addService = async (req, res) => {
    try {
        const newService = await serviceService.createService(req.user.id, req.body);
        res.status(201).json(newService);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

// 5. Editar servicio
const updateExistingService = async (req, res) => {
    try {
        const updated = await serviceService.updateService(req.params.id, req.body);
        res.json(updated);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

// 6. Eliminar servicio
const removeService = async (req, res) => {
    try {
        await serviceService.deleteService(req.params.id);
        res.json({ message: "Servicio eliminado correctamente" });
    } catch (error) { res.status(400).json({ error: error.message }); }
};

// 7. Obtener lista de técnicos
const getTechUsers = async (req, res) => {
    try {
        const techs = await serviceService.getTechUsersService();
        res.json(techs);
    } catch (error) { res.status(500).json({ message: "Error al obtener técnicos" }); }
};

module.exports = {
    getServices, getServiceById, getMyServices, 
    addService, updateExistingService, removeService, getTechUsers
};