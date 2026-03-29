const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { validateToken } = require('../middlewares/auth.middleware'); 
const { validateRegister } = require('../validators/auth.validator');
const { checkRole } = require('../middlewares/role.middleware');

// --- RUTAS PÚBLICAS (Autenticación) ---
router.post('/register', validateRegister, userController.registerUser);
router.post('/verify-otp', userController.verifyOTP);
router.post('/login', userController.login);

// --- RUTAS PÚBLICAS (Visualización para Clientes) ---
router.get('/tech/all', userController.getTechUsers); 
router.get('/tech/profile/:id', userController.getTechProfile); 
router.get('/tech/services/:id', userController.getUserServices);

// --- RUTAS PRIVADAS (Perfil y Mis Servicios) ---
router.get('/profile', validateToken, userController.getProfile);
router.put('/profile', validateToken, userController.updateProfile);

// SOLUCIÓN AL ERROR 500: Esta ruta permite al técnico ver sus propios servicios usando su Token
router.get('/my-services', validateToken, userController.getMyServices); 

// --- RUTAS DE ADMINISTRACIÓN (Solo ADMIN) ---
// Obtener lista de técnicos que esperan aprobación
router.get('/admin/pending', validateToken, checkRole(['ADMIN']), userController.getPendingTechs);

// Gestión total de usuarios
router.get('/', validateToken, checkRole(['ADMIN']), userController.getUsers);
router.get('/:id', validateToken, checkRole(['ADMIN']), userController.getUserDetail);
router.patch('/:id/status', validateToken, checkRole(['ADMIN']), userController.updateStatus);
router.delete('/:id', validateToken, checkRole(['ADMIN']), userController.deleteUser);

module.exports = router;