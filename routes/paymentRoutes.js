const express = require('express');
const router = express.Router();
const DatabaseService = require('../config/db')
const PaymentController = require('../controllers/PaymentController');

const paymentController = new PaymentController(DatabaseService.getConnection());

router.get('/', paymentController.getAllPayments.bind(paymentController));
router.get('/:id', paymentController.getPaymentById.bind(paymentController));
router.post('/', paymentController.createPayment.bind(paymentController));
router.put('/:id', paymentController.updatePayment.bind(paymentController));
router.delete('/:id', paymentController.deletePayment.bind(paymentController));

module.exports = router;