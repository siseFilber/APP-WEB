const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { validateToken } = require('../middlewares/auth.middleware'); 
const { validateRegister } = require('../validators/auth.validator');
const { checkRole } = require('../middlewares/role.middleware');

// --- RUTAS PÚBLICAS (Autenticación) ---
router.post('/register', validateRegister, userController.registerUser);
router.post('/resend-otp', userController.resendOTP);
router.post('/verify-otp', userController.verifyOTP);
router.post('/login', userController.login);

// --- RUTAS PÚBLICAS (Visualización de Staff para Clientes) ---
// Estas no llevan token para que cualquier visitante vea a los técnicos
router.get('/tecnicos', userController.getTechUsers);
router.get('/tecnicos/:id', userController.getTechProfile); // Perfil completo con servicios
router.get('/:id/services', userController.getUserServices); // Solo la lista de servicios

// --- RUTAS PRIVADAS (Perfil del usuario logueado) ---
router.get('/profile', validateToken, userController.getProfile);
router.put('/profile', validateToken, userController.updateProfile);

// --- RUTAS DE ADMINISTRACIÓN (Solo ADMIN) ---
// Usamos validateToken y checkRole para asegurar que nadie más entre
router.get('/', validateToken, checkRole(['ADMIN']), userController.getAllUsers);

// Detalle, Status, Rol y Delete
router.get('/:id', validateToken, checkRole(['ADMIN']), userController.getUserDetail);
router.patch('/:id/status', validateToken, checkRole(['ADMIN']), userController.updateStatus);
router.patch('/:id/role', validateToken, checkRole(['ADMIN']), userController.changeRole);
router.delete('/:id', validateToken, checkRole(['ADMIN']), userController.deleteUser);

module.exports = router;