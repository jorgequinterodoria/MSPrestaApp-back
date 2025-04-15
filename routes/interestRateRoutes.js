const express = require('express');
const router = express.Router();
const DatabaseService = require('../config/db')
const InterestRateController = require('../controllers/interestRateController');

const interestRateController = new InterestRateController(DatabaseService.getConnection());
router.get('/', interestRateController.getAllInterestRates.bind(interestRateController));
router.get('/:id', interestRateController.getInterestRateById.bind(interestRateController));
router.post('/', interestRateController.createInterestRate.bind(interestRateController));
router.put('/:id', interestRateController.updateInterestRate.bind(interestRateController));
router.delete('/:id', interestRateController.deleteInterestRate.bind(interestRateController));
module.exports = router;