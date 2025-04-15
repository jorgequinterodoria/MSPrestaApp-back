const { body } = require('express-validator');

const interestRateValidators = {
    createInterestRate: [
        body('percentage')
            .notEmpty()
            .withMessage('El porcentaje es requerido')
            .isFloat({ min: 0.01, max: 100 })
            .withMessage('El porcentaje debe ser un número entre 0.01 y 100')
            .custom((value) => {
                if (!/^\d+(\.\d{1,2})?$/.test(value.toString())) {
                    throw new Error('El porcentaje debe tener máximo 2 decimales');
                }
                return true;
            }),
        
        body('description')
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage('La descripción no puede exceder los 500 caracteres')
    ],

    updateInterestRate: [
        body('percentage')
            .optional()
            .isFloat({ min: 0.01, max: 100 })
            .withMessage('El porcentaje debe ser un número entre 0.01 y 100')
            .custom((value) => {
                if (value && !/^\d+(\.\d{1,2})?$/.test(value.toString())) {
                    throw new Error('El porcentaje debe tener máximo 2 decimales');
                }
                return true;
            }),
        
        body('description')
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage('La descripción no puede exceder los 500 caracteres'),
        
        body('is_active')
            .optional()
            .isBoolean()
            .withMessage('El estado activo debe ser un valor booleano')
    ]
};

module.exports = interestRateValidators;