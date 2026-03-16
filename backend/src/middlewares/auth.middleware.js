const jwt = require('jsonwebtoken');


const validateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    // AÑADE ESTO PARA DEBUGEAR:
    console.log("Token recibido:", token);
    console.log("Secreto usado:", process.env.JWT_SECRET);

    if (!token) return res.status(401).json({ message: "No hay token" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("Error de JWT:", err.message); // Esto nos dirá el motivo real
            return res.status(403).json({ message: "Token inválido" });
        }
        req.user = decoded; 
        next();
    });
};

module.exports = { validateToken };