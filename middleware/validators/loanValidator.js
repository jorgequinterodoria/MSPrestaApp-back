const { body } = require('express-validator');

const loanValidators = {
    createLoan: [
        body('client_id')
            .notEmpty()
            .withMessage('El ID del cliente es requerido')
            .isInt({ min: 1 })
            .withMessage('El ID del cliente debe ser un número entero positivo'),
        
        body('loan_type')
            .notEmpty()
            .withMessage('El tipo de préstamo es requerido')
            .isIn(['interest_only', 'fixed_installment'])
            .withMessage('El tipo de préstamo debe ser "interest_only" o "fixed_installment"'),
        
        body('principal_amount')
            .notEmpty()
            .withMessage('El monto principal es requerido')
            .isFloat({ min: 0.01 })
            .withMessage('El monto principal debe ser mayor a 0')
            .custom((value) => {
                if (!/^\d+(\.\d{1,2})?$/.test(value.toString())) {
                    throw new Error('El monto principal debe tener máximo 2 decimales');
                }
                return true;
            }),
        
        body('start_date')
            .notEmpty()
            .withMessage('La fecha de inicio es requerida')
            .isDate()
            .withMessage('La fecha de inicio debe ser una fecha válida'),
        
        body('end_date')
            .notEmpty()
            .withMessage('La fecha de finalización es requerida')
            .isDate()
            .withMessage('La fecha de finalización debe ser una fecha válida')
            .custom((value, { req }) => {
                if (new Date(value) <= new Date(req.body.start_date)) {
                    throw new Error('La fecha de finalización debe ser posterior a la fecha de inicio');
                }
                return true;
            }),
        
        body('interest_rate_id')
            .notEmpty()
            .withMessage('El ID de la tasa de interés es requerido')
            .isInt({ min: 1 })
            .withMessage('El ID de la tasa de interés debe ser un número entero positivo'),
        
        body('payment_period_id')
            .notEmpty()
            .withMessage('El ID del período de pago es requerido')
            .isInt({ min: 1 })
            .withMessage('El ID del período de pago debe ser un número entero positivo')
    ],

    updateLoan: [
        body('loan_type')
            .optional()
            .isIn(['interest_only', 'fixed_installment'])
            .withMessage('El tipo de préstamo debe ser "interest_only" o "fixed_installment"'),
        
        body('principal_amount')
            .optional()
            .isFloat({ min: 0.01 })
            .withMessage('El monto principal debe ser mayor a 0')
            .custom((value) => {
                if (value && !/^\d+(\.\d{1,2})?$/.test(value.toString())) {
                    throw new Error('El monto principal debe tener máximo 2 decimales');
                }
                return true;
            }),
        
        body('start_date')
            .optional()
            .isDate()
            .withMessage('La fecha de inicio debe ser una fecha válida'),
        
        body('end_date')
            .optional()
            .isDate()
            .withMessage('La fecha de finalización debe ser una fecha válida')
            .custom((value, { req }) => {
                if (value && req.body.start_date && new Date(value) <= new Date(req.body.start_date)) {
                    throw new Error('La fecha de finalización debe ser posterior a la fecha de inicio');
                }
                return true;
            }),
        
        body('interest_rate_id')
            .optional()
            .isInt({ min: 1 })
            .withMessage('El ID de la tasa de interés debe ser un número entero positivo'),
        
        body('payment_period_id')
            .optional()
            .isInt({ min: 1 })
            .withMessage('El ID del período de pago debe ser un número entero positivo'),
        
        body('current_balance')
            .optional()
            .isFloat({ min: 0 })
            .withMessage('El saldo actual debe ser mayor o igual a 0')
            .custom((value) => {
                if (value && !/^\d+(\.\d{1,2})?$/.test(value.toString())) {
                    throw new Error('El saldo actual debe tener máximo 2 decimales');
                }
                return true;
            }),
        
        body('status')
            .optional()
            .isIn(['active', 'terminated'])
            .withMessage('El estado debe ser "active" o "terminated"')
    ]
};

module.exports = loanValidators;