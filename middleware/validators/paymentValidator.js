const { body } = require('express-validator');

const paymentValidators = {
    createPayment: [
        body('loan_id')
            .notEmpty()
            .withMessage('El ID del préstamo es requerido')
            .isInt({ min: 1 })
            .withMessage('El ID del préstamo debe ser un número entero positivo'),
        
        body('amount')
            .notEmpty()
            .withMessage('El monto del pago es requerido')
            .isFloat({ min: 0.01 })
            .withMessage('El monto del pago debe ser mayor a 0')
            .custom((value) => {
                if (!/^\d+(\.\d{1,2})?$/.test(value.toString())) {
                    throw new Error('El monto del pago debe tener máximo 2 decimales');
                }
                return true;
            }),
        
        body('payment_date')
            .notEmpty()
            .withMessage('La fecha de pago es requerida')
            .isISO8601()
            .withMessage('La fecha de pago debe ser una fecha válida en formato ISO8601')
            .custom((value) => {
                const paymentDate = new Date(value);
                const now = new Date();
                if (paymentDate > now) {
                    throw new Error('La fecha de pago no puede ser futura');
                }
                return true;
            }),
        
        body('notes')
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage('Las notas no pueden exceder los 500 caracteres')
    ],

    updatePayment: [
        body('amount')
            .optional()
            .isFloat({ min: 0.01 })
            .withMessage('El monto del pago debe ser mayor a 0')
            .custom((value) => {
                if (value && !/^\d+(\.\d{1,2})?$/.test(value.toString())) {
                    throw new Error('El monto del pago debe tener máximo 2 decimales');
                }
                return true;
            }),
        
        body('payment_date')
            .optional()
            .isISO8601()
            .withMessage('La fecha de pago debe ser una fecha válida en formato ISO8601')
            .custom((value) => {
                if (value) {
                    const paymentDate = new Date(value);
                    const now = new Date();
                    if (paymentDate > now) {
                        throw new Error('La fecha de pago no puede ser futura');
                    }
                }
                return true;
            }),
        
        body('notes')
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage('Las notas no pueden exceder los 500 caracteres')
    ]
};

module.exports = paymentValidators;