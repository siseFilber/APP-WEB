const userService = require('../services/user.service');
const { prisma } = require('../config/db');

const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const registerUser = async (req, res) => {
    try {
        const newUser = await userService.registerService(req.body);
        const { password, verificationCode, ...publicUser } = newUser;
        res.status(201).json({
            message: "Registro exitoso. Revisa tu correo.",
            user: publicUser
        });
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ error: "El email o DNI ya están registrados." });
        }
        res.status(400).json({ error: error.message });
    }
};

const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await userService.resendCodeService(email);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const verifyOTP = async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

        // Validar si el código coincide
        if (user.verificationCode !== code) {
            return res.status(400).json({ error: "Código de verificación incorrecto" });
        }

        // Definir siguiente estado según el rol
        const nextStatus = (user.role === "TECH") ? "WAITING_ADMIN" : "ACTIVE";

        await prisma.user.update({
            where: { email },
            data: { 
                isVerified: true, 
                status: nextStatus, 
                verificationCode: null // Se borra para que no se use de nuevo
            }
        });

        res.json({ message: "Cuenta verificada con éxito", status: nextStatus });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await userService.loginService(email, password);
        
        // Limpiamos datos sensibles antes de enviar
        const { password: _, verificationCode: __, ...publicUser } = data.user;

        res.json({
            message: "Login exitoso",
            user: publicUser,
            token: data.token
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
// Ver perfil del usuario logueado
const getProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });
        const { password, verificationCode, ...publicUser } = user;
        res.json(publicUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar todos los usuarios (Para el Admin)
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Agregar al controlador:
const getPendingTechs = async (req, res) => {
    try {
        const pending = await prisma.user.findMany({
            where: { status: "WAITING_ADMIN" },
            orderBy: { createdAt: 'asc' } // Los más antiguos primero
        });
        res.json(pending);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Actualizar estado (Aprobar técnicos)
const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        // Validación básica
        const allowedStatus = ["ACTIVE", "BANNED", "WAITING_ADMIN"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ error: "Estado no permitido" });
        }

        const updated = await prisma.user.update({
            where: { id: Number(id) },
            data: { status }
        });
        res.json({ message: "Estado actualizado con éxito", user: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Agrega 'login' al module.exports del controlador

// No olvides agregarlo al module.exports al final del archivo
const updateProfile = async (req, res) => {
    try {
        const updatedUser = await userService.updateProfileService(req.user.id, req.body);
        const { password, verificationCode, ...publicUser } = updatedUser;
        res.json({ message: "Perfil actualizado", user: publicUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUserDetail = async (req, res) => {
    try {
        const user = await userService.getUserByIdService(req.params.id);
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
        const { password, ...publicUser } = user;
        res.json(publicUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const changeRole = async (req, res) => {
    try {
        const { role } = req.body;
        const updated = await userService.changeRoleService(req.params.id, role);
        res.json({ message: "Rol actualizado", user: updated });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await userService.deleteUserService(req.params.id);
        res.json({ message: "Usuario eliminado permanentemente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getTechUsers = async (req, res) => {
    try {
        const techs = await userService.getTechUsersService();
        res.status(200).json(techs);
    } catch (error) {
        console.error("Error en getTechUsers:", error);
        res.status(500).json({ message: "Error al obtener la lista de técnicos" });
    }
};
// Obtener servicios de un técnico específico
const getUserServices = async (req, res) => {
    try {
        const { id } = req.params;
        // Usamos la función del service que creamos antes
        const services = await userService.getServicesByUserId(id);
        
        if (!services) {
            return res.status(404).json({ message: "No se encontraron servicios para este usuario" });
        }
        
        res.json(services);
    } catch (error) {
        console.error("Error en getUserServices:", error);
        res.status(500).json({ error: error.message });
    }
};

// Obtener perfil completo del técnico (incluyendo servicios) en una sola petición
const getTechProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const techProfile = await userService.getTechProfileWithServices(id);
        
        if (!techProfile) {
            return res.status(404).json({ error: "Técnico no encontrado" });
        }
        
        res.json(techProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { 
    getUsers, 
    registerUser, 
    resendOTP, 
    verifyOTP, 
    login, 
    getProfile,
    getAllUsers,
    updateStatus,
    updateProfile,
    getUserDetail,
    changeRole,
    deleteUser,
    getTechUsers,
    getUserServices, 
    getTechProfile  ,
    getPendingTechs 
};