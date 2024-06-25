// ./routes/fornecedorRoutes.js

const express = require('express');
const db = require("../models");
const FornecedorService = require('../services/fornecedorService'); // Ajuste o caminho conforme necessário
const fornecedorServiceInstance = new FornecedorService(db.Fornecedor); // Ajuste o caminho conforme necessário

const FornecedorController = require('../controllers/fornecedorController'); // Ajuste o caminho conforme necessário
const fornecedorControllerInstance = new FornecedorController(fornecedorServiceInstance);

const { authenticateToken } = require('../middleware/auth'); // Ajuste o caminho conforme necessário

const router = express.Router();

router.post('/', authenticateToken, fornecedorControllerInstance.createFornecedor);
router.put('/:id', authenticateToken, fornecedorControllerInstance.updateFornecedor);
router.get('/', authenticateToken, fornecedorControllerInstance.findAllFornecedores);
router.get('/:id', authenticateToken, fornecedorControllerInstance.findFornecedorById);
router.delete('/:id', authenticateToken, fornecedorControllerInstance.deleteFornecedor);

module.exports = router;
