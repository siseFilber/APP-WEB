const checkRole = (roles) => {
    return (req, res, next) => {
        // Validación de seguridad: ¿Existe el usuario en la petición?
        if (!req.user) {
            return res.status(401).json({ message: "No autenticado. Falta el token." });
        }

        const userRole = req.user.role; 

        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: "No tienes permiso para realizar esta acción." });
        }
        next();
    };
};

module.exports = { checkRole };