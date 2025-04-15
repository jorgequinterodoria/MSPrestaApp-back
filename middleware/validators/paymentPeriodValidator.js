const { body } = require('express-validator');

const paymentPeriodValidators = {
    createPaymentPeriod: [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('El nombre es requerido')
            .isLength({ min: 3, max: 50 })
            .withMessage('El nombre debe tener entre 3 y 50 caracteres'),
        
        body('days')
            .notEmpty()
            .withMessage('El número de días es requerido')
            .isInt({ min: 1, max: 365 })
            .withMessage('Los días deben ser un número entero entre 1 y 365')
    ],

    updatePaymentPeriod: [
        body('name')
            .optional()
            .trim()
            .notEmpty()
            .withMessage('El nombre no puede estar vacío')
            .isLength({ min: 3, max: 50 })
            .withMessage('El nombre debe tener entre 3 y 50 caracteres'),
        
        body('days')
            .optional()
            .isInt({ min: 1, max: 365 })
            .withMessage('Los días deben ser un número entero entre 1 y 365'),
        
        body('is_active')
            .optional()
            .isBoolean()
            .withMessage('El estado activo debe ser un valor booleano')
    ]
};

module.exports = paymentPeriodValidators;