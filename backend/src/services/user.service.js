const { prisma } = require('../config/db');
const { encrypt } = require('../utils/handlePassword');
const { sendVerificationEmail } = require('./mail.service');
const jwt = require('jsonwebtoken');
const { compare } = require('../utils/handlePassword');

const getAllUsers = async () => {
    return await prisma.user.findMany();
};
const loginService = async (email, password) => {
    // 1. ¿Existe el usuario?
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("EMAIL_NO_ENCONTRADO");

    // 2. ¿Está verificado? (Regla de negocio SISE)
    if (!user.isVerified) throw new Error("CUENTA_NO_VERIFICADA");

    // 3. ¿La contraseña es correcta?
    const isCorrect = await compare(password, user.password);
    if (!isCorrect) throw new Error("CONTRASEÑA_INCORRECTA");

    // 4. Generar Token (JWT)
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET ,
        { expiresIn: '8h' }
    );

    return { user, token };
};

const registerService = async (userData) => {
    const { dni, email, password, name, role } = userData;

    // 1. Validación de formato de DNI
    if (!/^\d{8}$/.test(dni)) throw new Error("El DNI debe tener exactamente 8 números");

    // 2. Encriptar contraseña y generar código OTP
    const passwordHash = await encrypt(password);
    const vCode = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Crear en la base de datos (Postgres/Docker)
    const user = await prisma.user.create({
        data: {
            dni,
            email,
            name,
            password: passwordHash,
            role: (role === "TECH") ? "TECH" : "CLIENT",
            status: "PENDING",
            verificationCode: vCode
        }
    });

    // 4. Envío de correo (Asíncrono)
    sendVerificationEmail(email, vCode);

    return user;
};

const resendCodeService = async (email) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error("USUARIO_NO_ENCONTRADO");
    if (user.isVerified) throw new Error("USUARIO_YA_VERIFICADO");

    const newCode = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.user.update({
        where: { email },
        data: { verificationCode: newCode }
    });

    await sendVerificationEmail(email, newCode);
    return { message: "Código reenviado con éxito" };
};

// Actualizar datos básicos del perfil
const updateProfileService = async (id, data) => {
    // Filtramos para que no cambien el password o el rol desde aquí
    const { name, email, dni } = data;
    return await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email, dni }
    });
};

// Obtener un usuario por su ID
const getUserByIdService = async (id) => {
    return await prisma.user.findUnique({
        where: { id: Number(id) }
    });
};

// Cambiar el Rol (Solo Admin)
const changeRoleService = async (id, newRole) => {
    return await prisma.user.update({
        where: { id: Number(id) },
        data: { role: newRole }
    });
};

// Eliminar usuario
const deleteUserService = async (id) => {
    return await prisma.user.delete({
        where: { id: Number(id) }
    });
};
const getTechUsersService = async () => {
    return await prisma.user.findMany({
        where: {
            role: "TECH",
            status: "ACTIVE", // Solo mostrar técnicos que ya verificaron su cuenta
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            // Agrega aquí otros campos que quieras mostrar, pero NO la password
        }
    });
};
// Obtener un técnico específico con todos sus servicios incluidos
const getTechProfileWithServices = async (id) => {
    return await prisma.user.findUnique({
        where: { 
            id: Number(id),
            role: "TECH" 
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            // Aquí hacemos el "JOIN" con la tabla de servicios
            services: true 
        }
    });
};

// Obtener solo la lista de servicios de un usuario específico
const getServicesByUserId = async (userId) => {
    return await prisma.service.findMany({
        where: {
            userId: Number(userId)
        }
    });
};


// ACTUALIZA TU EXPORTACIÓN AL FINAL DEL SERVICE:
module.exports = { 
    getAllUsers, 
    registerService, 
    resendCodeService,
    loginService,
    updateProfileService,
    getUserByIdService,
    changeRoleService,
    deleteUserService,
    getTechUsersService,
    getTechProfileWithServices, // <-- Nueva
    getServicesByUserId         // <-- Nueva
};