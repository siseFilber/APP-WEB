const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const { validateToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/role.middleware');

// --- RUTAS PÚBLICAS ---
// Cualquiera (Clientes/Visitantes) puede ver la lista de servicios
router.get('/', serviceController.getServices);

// --- RUTAS PROTEGIDAS (TECH y ADMIN) ---

// El técnico ve sus propios servicios para gestionarlos
router.get('/my-services', validateToken, checkRole(['TECH', 'ADMIN']), serviceController.getMyServices);

router.get('/tecnicos',validateToken, checkRole(['TECH', 'ADMIN']), serviceController.getTechUsers);
// Permitimos que el TECH cree sus servicios y el ADMIN gestione todo
router.post('/', validateToken, checkRole(['TECH', 'ADMIN','CLIENT']), serviceController.addService);

// Edición y eliminación permitida para el dueño (TECH) o el jefe (ADMIN)
router.put('/:id', validateToken, checkRole(['TECH', 'ADMIN']), serviceController.updateExistingService);
router.delete('/:id', validateToken, checkRole(['TECH', 'ADMIN']), serviceController.removeService);

module.exports = router;