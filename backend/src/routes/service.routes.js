const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const { validateToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/role.middleware');

// --- 1. RUTAS PÚBLICAS (Catálogo) ---
// Obtener todos los servicios para la grilla principal
router.get('/', serviceController.getServices);

// --- 2. RUTAS PRIVADAS / ESPECÍFICAS (Fijas primero) ---
// Importante: /my-services y /tecnicos DEBEN ir antes de /:id
router.get('/my-services', validateToken, serviceController.getMyServices);

// Lista de técnicos para el Admin/Staff
router.get('/tecnicos', validateToken, checkRole(['TECH', 'ADMIN']), serviceController.getTechUsers);

// --- 3. RUTAS CON PARÁMETRO (:id) ---
// Si ponemos esta arriba de /my-services, Express pensará que "my-services" es un ID
router.get('/:id', serviceController.getServiceById);

// --- 4. OPERACIONES DE ESCRITURA (Protegidas) ---
router.post('/', validateToken, checkRole(['TECH', 'ADMIN']), serviceController.addService);
router.put('/:id', validateToken, checkRole(['TECH', 'ADMIN']), serviceController.updateExistingService);
router.delete('/:id', validateToken, checkRole(['TECH', 'ADMIN']), serviceController.removeService);

module.exports = router;