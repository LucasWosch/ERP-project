// ./routes/clienteRoutes.js

const express = require('express');
const db = require('../models');
const ClienteService = require('../services/clienteService');
const ClienteController = require('../controllers/clienteController');

const clienteServiceInstance = new ClienteService(db.Cliente);
const clienteControllerInstance = new ClienteController(clienteServiceInstance);

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, clienteControllerInstance.createCliente);
router.get('/', authenticateToken, clienteControllerInstance.getAllClientes);
router.get('/:id', authenticateToken, clienteControllerInstance.getClienteById);
router.put('/:id', authenticateToken, clienteControllerInstance.updateCliente);
router.delete('/:id', authenticateToken, clienteControllerInstance.deleteCliente);

module.exports = router;
