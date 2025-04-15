const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');
const DatabaseService = require('../config/db')

const clientController = new ClientController(DatabaseService.getConnection());

router.get('/', clientController.getAllClients.bind(clientController));
router.get('/:id', clientController.getClientById.bind(clientController));
router.post('/', clientController.createClient.bind(clientController));
router.put('/:id', clientController.updateClient.bind(clientController));
router.delete('/:id', clientController.deleteClient.bind(clientController));
module.exports = router;