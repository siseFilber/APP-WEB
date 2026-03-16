const { check, validationResult } = require('express-validator');

const validateRegister = [
    check('name').exists().notEmpty().withMessage('El nombre es obligatorio'),
    check('dni').isNumeric().isLength({ min: 8, max: 8 }).withMessage('El DNI debe tener 8 dígitos'),
    check('email').isEmail().withMessage('Debe ser un correo válido'),
    check('password').isLength({ min: 6 }).withMessage('La clave debe tener al menos 6 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateRegister };