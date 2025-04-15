const { body } = require('express-validator');

const notificationValidators = {
    createNotification: [
        body('client_id')
            .notEmpty()
            .withMessage('El ID del cliente es requerido')
            .isInt({ min: 1 })
            .withMessage('El ID del cliente debe ser un número entero positivo'),
        
        body('loan_id')
            .optional()
            .isInt({ min: 1 })
            .withMessage('El ID del préstamo debe ser un número entero positivo'),
        
        body('message')
            .notEmpty()
            .withMessage('El mensaje es requerido')
            .trim()
            .isLength({ min: 5, max: 500 })
            .withMessage('El mensaje debe tener entre 5 y 500 caracteres'),
        
        body('type')
            .notEmpty()
            .withMessage('El tipo de notificación es requerido')
            .isIn(['reminder', 'due', 'alert'])
            .withMessage('El tipo de notificación debe ser "reminder", "due" o "alert"'),
        
        body('send_date')
            .notEmpty()
            .withMessage('La fecha de envío es requerida')
            .isISO8601()
            .withMessage('La fecha de envío debe ser una fecha válida en formato ISO8601')
    ],

    updateNotification: [
        body('message')
            .optional()
            .trim()
            .notEmpty()
            .withMessage('El mensaje no puede estar vacío')
            .isLength({ min: 5, max: 500 })
            .withMessage('El mensaje debe tener entre 5 y 500 caracteres'),
        
        body('type')
            .optional()
            .isIn(['reminder', 'due', 'alert'])
            .withMessage('El tipo de notificación debe ser "reminder", "due" o "alert"'),
        
        body('send_date')
            .optional()
            .isISO8601()
            .withMessage('La fecha de envío debe ser una fecha válida en formato ISO8601'),
        
        body('status')
            .optional()
            .isIn(['pending', 'sent'])
            .withMessage('El estado debe ser "pending" o "sent"')
    ]
};

module.exports = notificationValidators;