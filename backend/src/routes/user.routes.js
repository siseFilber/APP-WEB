const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { validateToken } = require('../middlewares/auth.middleware'); 
const { validateRegister } = require('../validators/auth.validator');
const { checkRole } = require('../middlewares/role.middleware');

// --- RUTAS PÚBLICAS (Sin Token) ---
router.post('/register', validateRegister, userController.registerUser);
router.post('/resend-otp', userController.resendOTP);
router.post('/verify-otp', userController.verifyOTP);
router.post('/login', userController.login);

// --- RUTAS PRIVADAS (Cualquier usuario logueado) ---
router.get('/profile', validateToken, userController.getProfile);
router.put('/profile', validateToken, userController.updateProfile); // Editar mis datos

// --- RUTAS DE ADMINISTRACIÓN (Solo ADMIN) ---
// 1. Listar todos
router.get('/', validateToken, checkRole(['ADMIN']), userController.getAllUsers);
router.get('/tecnicos', userController.getTechUsers);
// 2. Detalle de un usuario específico
router.get('/:id', validateToken, checkRole(['ADMIN']), userController.getUserDetail);

// 3. Cambiar estado (Aprobar/Banear)
router.patch('/:id/status', validateToken, checkRole(['ADMIN']), userController.updateStatus);

// 4. Cambiar Rol (CLIENT -> TECH)
router.patch('/:id/role', validateToken, checkRole(['ADMIN']), userController.changeRole);

// 5. Eliminar usuario
router.delete('/:id', validateToken, checkRole(['ADMIN']), userController.deleteUser);

router.get('/tecnicos', userController.getTechUsers);
module.exports = router;