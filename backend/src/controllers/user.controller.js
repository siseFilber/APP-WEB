const userService = require('../services/user.service');

const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const registerUser = async (req, res) => {
    try {
        const newUser = await userService.registerService(req.body);
        const { password, verificationCode, ...publicUser } = newUser;
        res.status(201).json({ message: "Revisa tu correo", user: publicUser });
    } catch (error) { res.status(400).json({ error: error.message }); }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, code } = req.body;
        const updatedUser = await userService.verifyOTPService(email, code);
        res.json({ message: "Verificado", status: updatedUser.status });
    } catch (error) { res.status(400).json({ error: error.message }); }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await userService.loginService(email, password);
        const { password: _, ...publicUser } = data.user;
        res.json({ user: publicUser, token: data.token });
    } catch (error) { res.status(401).json({ error: error.message }); }
};

const getProfile = async (req, res) => {
    try {
        const user = await userService.getUserByIdService(req.user.id);
        const { password, ...publicUser } = user;
        res.json(publicUser);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

// --- ESTA ES LA FUNCIÓN QUE TE FALTABA PARA EL ERROR 500 ---
const getMyServices = async (req, res) => {
    try {
        const services = await userService.getServicesByUserId(req.user.id);
        res.json(services);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const getPendingTechs = async (req, res) => {
    try {
        const pending = await userService.getPendingTechsService();
        res.json(pending);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated = await userService.updateStatusService(id, status);
        res.json({ message: "Estado actualizado", user: updated });
    } catch (error) { res.status(400).json({ error: error.message }); }
};

const getTechUsers = async (req, res) => {
    try {
        const techs = await userService.getTechUsersService();
        res.json(techs);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const getUserServices = async (req, res) => {
    try {
        const services = await userService.getServicesByUserId(req.params.id);
        res.json(services);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const getTechProfile = async (req, res) => {
    try {
        const profile = await userService.getTechProfileWithServices(req.params.id);
        res.json(profile);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

const updateProfile = async (req, res) => {
    try {
        const updated = await userService.updateProfileService(req.user.id, req.body);
        res.json(updated);
    } catch (error) { res.status(400).json({ error: error.message }); }
};

const deleteUser = async (req, res) => {
    try {
        await userService.deleteUserService(req.params.id);
        res.json({ message: "Eliminado" });
    } catch (error) { res.status(400).json({ error: error.message }); }
};

module.exports = { 
    getUsers, registerUser, verifyOTP, login, getProfile, getMyServices,
    getPendingTechs, updateStatus, getTechUsers, getUserServices, 
    getTechProfile, updateProfile, deleteUser 
};