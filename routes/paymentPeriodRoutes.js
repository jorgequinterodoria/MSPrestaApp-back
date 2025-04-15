const express = require('express');
const router = express.Router();
const DatabaseService = require('../config/db')
const PaymentPeriodController = require('../controllers/paymentPeriodController');

const paymentPeriodController = new PaymentPeriodController(DatabaseService.getConnection());

router.get('/', paymentPeriodController.getAllPaymentPeriods.bind(paymentPeriodController));
router.get('/:id', paymentPeriodController.getPaymentPeriodById.bind(paymentPeriodController));
router.post('/', paymentPeriodController.createPaymentPeriod.bind(paymentPeriodController));
router.put('/:id', paymentPeriodController.updatePaymentPeriod.bind(paymentPeriodController));
router.delete('/:id', paymentPeriodController.deletePaymentPeriod.bind(paymentPeriodController));

module.exports = router;