const express = require('express');
const router = express.Router();
const DatabaseService = require('../config/db')
const LoanController = require('../controllers/loanController');

const loanController = new LoanController(DatabaseService.getConnection());

router.get('/', loanController.getAllLoans.bind(loanController));
router.get('/:id', loanController.getLoanById.bind(loanController));
router.post('/', loanController.createLoan.bind(loanController));
router.put('/:id', loanController.updateLoan.bind(loanController));
router.delete('/:id', loanController.deleteLoan.bind(loanController));
module.exports = router;