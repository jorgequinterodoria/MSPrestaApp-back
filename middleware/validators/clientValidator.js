const { body } = require('express-validator');

const clientValidators = {
    createClient: [
        body('full_name')
            .trim()
            .notEmpty()
            .withMessage('El nombre completo es requerido')
            .isLength({ min: 3, max: 255 })
            .withMessage('El nombre debe tener entre 3 y 255 caracteres'),
        
        body('phone')
            .trim()
            .notEmpty()
            .withMessage('El teléfono es requerido')
            .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
            .withMessage('El formato del teléfono no es válido'),
        
        body('address')
            .trim()
            .notEmpty()
            .withMessage('La dirección es requerida')
            .isLength({ min: 5 })
            .withMessage('La dirección debe tener al menos 5 caracteres')
    ],

    updateClient: [
        body('full_name')
            .optional()
            .trim()
            .notEmpty()
            .withMessage('El nombre completo no puede estar vacío')
            .isLength({ min: 3, max: 255 })
            .withMessage('El nombre debe tener entre 3 y 255 caracteres'),
        
        body('phone')
            .optional()
            .trim()
            .notEmpty()
            .withMessage('El teléfono no puede estar vacío')
            .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
            .withMessage('El formato del teléfono no es válido'),
        
        body('address')
            .optional()
            .trim()
            .notEmpty()
            .withMessage('La dirección no puede estar vacía')
            .isLength({ min: 5 })
            .withMessage('La dirección debe tener al menos 5 caracteres')
    ]
};

module.exports = clientValidators;