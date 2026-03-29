const { prisma } = require('../config/db');
const { encrypt, compare } = require('../utils/handlePassword');
const { sendVerificationEmail } = require('./mail.service');
const jwt = require('jsonwebtoken');

// --- LÓGICA DE USUARIOS ---

const getAllUsers = async () => {
    return await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
};

const getUserByIdService = async (id) => {
    return await prisma.user.findUnique({ where: { id: Number(id) } });
};

const registerService = async (userData) => {
    const { dni, email, password, name, role } = userData;
    const passwordHash = await encrypt(password);
    const vCode = Math.floor(100000 + Math.random() * 900000).toString();

    return await prisma.user.create({
        data: {
            dni, email, name,
            password: passwordHash,
            role: (role === "TECH") ? "TECH" : "CLIENT",
            status: "PENDING",
            verificationCode: vCode
        }
    });
};

const loginService = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("EMAIL_NO_ENCONTRADO");
    if (!user.isVerified) throw new Error("CUENTA_NO_VERIFICADA");

    const isCorrect = await compare(password, user.password);
    if (!isCorrect) throw new Error("CONTRASEÑA_INCORRECTA");

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );
    return { user, token };
};

const verifyOTPService = async (email, code) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.verificationCode !== code) throw new Error("CÓDIGO_INVÁLIDO");

    const nextStatus = (user.role === "TECH") ? "WAITING_ADMIN" : "ACTIVE";

    return await prisma.user.update({
        where: { email },
        data: { 
            isVerified: true, 
            status: nextStatus, 
            verificationCode: null 
        }
    });
};

const updateProfileService = async (id, data) => {
    return await prisma.user.update({
        where: { id: Number(id) },
        data: { name: data.name, email: data.email, dni: data.dni }
    });
};

const updateStatusService = async (id, status) => {
    return await prisma.user.update({
        where: { id: Number(id) },
        data: { status }
    });
};

const changeRoleService = async (id, newRole) => {
    return await prisma.user.update({
        where: { id: Number(id) },
        data: { role: newRole }
    });
};

const deleteUserService = async (id) => {
    return await prisma.user.delete({ where: { id: Number(id) } });
};

// --- LÓGICA DE TÉCNICOS Y SERVICIOS ---

const getTechUsersService = async () => {
    return await prisma.user.findMany({
        where: { role: "TECH", status: "ACTIVE" },
        select: { id: true, name: true, email: true, role: true }
    });
};

const getPendingTechsService = async () => {
    return await prisma.user.findMany({
        where: { status: "WAITING_ADMIN" }
    });
};

const getServicesByUserId = async (userId) => {
    return await prisma.service.findMany({
        where: { techId: Number(userId) }
    });
};

const getTechProfileWithServices = async (id) => {
    return await prisma.user.findUnique({
        where: { id: Number(id), role: "TECH" },
        select: { id: true, name: true, email: true, services: true }
    });
};

module.exports = { 
    getAllUsers, getUserByIdService, registerService, loginService,
    verifyOTPService, updateProfileService, updateStatusService,
    changeRoleService, deleteUserService, getTechUsersService,
    getPendingTechsService, getServicesByUserId, getTechProfileWithServices
};