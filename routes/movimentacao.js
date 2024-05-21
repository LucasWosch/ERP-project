// ./routes/movimentacaoProdutoRoutes.js

const express = require('express');
const db = require("../models");
const MovimentacaoProdutoService = require('../services/movimentacaoProdutoService'); // Ajuste o caminho conforme necessário
const movimentacaoProdutoServiceInstance = new MovimentacaoProdutoService(db.MovimentacaoProduto); // Ajuste o caminho conforme necessário

const MovimentacaoProdutoController = require('../controllers/movimentacaoProdutoController'); // Ajuste o caminho conforme necessário
const movimentacaoProdutoControllerInstance = new MovimentacaoProdutoController(movimentacaoProdutoServiceInstance);

const { authenticateToken, logout } = require('../middleware/auth'); 

const router = express.Router();

router.post('/', authenticateToken, movimentacaoProdutoControllerInstance.createMovimentacaoProduto);
router.get('/', authenticateToken, movimentacaoProdutoControllerInstance.findAllMovimentacoesProduto);
router.get('/produto/:produtoId', authenticateToken, movimentacaoProdutoControllerInstance.findByProduto);
router.get('/deposito/:depositoId', authenticateToken, movimentacaoProdutoControllerInstance.findByDeposito);
router.get('/data', authenticateToken, movimentacaoProdutoControllerInstance.findByData);

module.exports = router;
