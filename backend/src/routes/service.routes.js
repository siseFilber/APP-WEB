const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const { validateToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/role.middleware');

// --- 1. RUTAS PÚBLICAS (Catálogo General) ---
// Cualquiera puede ver qué servicios ofrece SupportComputer
router.get('/', serviceController.getServices);

// --- 2. RUTAS PRIVADAS / ESPECÍFICAS (Orden Prioritario) ---
// Obtener solo LOS MÍOS (Solo técnicos y admins autenticados)
router.get('/my-services', validateToken, checkRole(['TECH', 'ADMIN']), serviceController.getMyServices);

// Ver lista de técnicos registrados (Para el administrador)
router.get('/tecnicos', validateToken, checkRole(['TECH', 'ADMIN']), serviceController.getTechUsers);

// --- 3. RUTAS CON PARÁMETRO DINÁMICO ---
// Detalle de un servicio por su ID (Debe ir después de las rutas fijas)
router.get('/:id', serviceController.getServiceById);

// --- 4. OPERACIONES DE ESCRITURA (Gestión del Catálogo) ---
// Solo el Staff (Tech/Admin) puede crear, editar o borrar servicios
router.post('/', validateToken, checkRole(['TECH', 'ADMIN']), serviceController.addService);
router.put('/:id', validateToken, checkRole(['TECH', 'ADMIN']), serviceController.updateExistingService);
router.delete('/:id', validateToken, checkRole(['TECH', 'ADMIN']), serviceController.removeService);

module.exports = router;