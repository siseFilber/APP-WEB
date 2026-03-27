const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const { validateToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/role.middleware');

// Rutas Públicas
router.get('/', serviceController.getServices);
router.get('/tecnicos', validateToken, checkRole(['TECH', 'ADMIN']), serviceController.getTechUsers);
router.get('/:id', serviceController.getServiceById); // IMPORTANTE: debajo de /tecnicos

// Rutas Protegidas
router.get('/my-services', validateToken, checkRole(['TECH', 'ADMIN']), serviceController.getMyServices);
router.post('/', validateToken, checkRole(['TECH', 'ADMIN', 'CLIENT']), serviceController.addService);
router.put('/:id', validateToken, checkRole(['TECH', 'ADMIN']), serviceController.updateExistingService);
router.delete('/:id', validateToken, checkRole(['TECH', 'ADMIN']), serviceController.removeService);

module.exports = router;