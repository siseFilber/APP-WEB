const bcrypt = require('bcrypt');

/**
 * Encriptar la contraseña (Hash)
 */
const encrypt = async (passwordPlain) => {
    const hash = await bcrypt.hash(passwordPlain, 10); // El 10 es el nivel de seguridad
    return hash;
};

/**
 * Comparar la contraseña ingresada con la encriptada en la DB
 */
const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword);
};

module.exports = { encrypt, compare };