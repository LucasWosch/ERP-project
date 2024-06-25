// ./routes/tituloReceberRoutes.js

const express = require('express');
const db = require('../models');
const TituloReceberService = require('../services/tituloReceberService');
const MovimentacaoProdutoService = require('../services/movimentacaoProdutoService'); // Ajuste o caminho conforme necessário
const movimentacaoProdutoServiceInstance = new MovimentacaoProdutoService(db.MovimentacaoProduto);

const tituloReceberServiceInstance = new TituloReceberService(db.TituloReceber, db.MovimentacaoTituloReceber, movimentacaoProdutoServiceInstance);
const TituloReceberController = require('../controllers/tituloReceberController');
const tituloReceberControllerInstance = new TituloReceberController(tituloReceberServiceInstance);

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, tituloReceberControllerInstance.getAllTitulosReceber);
router.get('/:id', authenticateToken, tituloReceberControllerInstance.getTituloReceberById);
router.put('/:id/pagar', authenticateToken, tituloReceberControllerInstance.registerPayment);

module.exports = router;
