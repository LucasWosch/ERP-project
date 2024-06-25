// ./routes/movimentacaoTituloReceberRoutes.js

const express = require('express');
const db = require('../models');
const MovimentacaoTituloReceberService = require('../services/movimentacaoTituloReceberService');

const movimentacaoTituloReceberServiceInstance = new MovimentacaoTituloReceberService(db.MovimentacaoTituloReceber);

const MovimentacaoTituloReceberController = require('../controllers/movimentacaoTituloReceberController');
const movimentacaoTituloReceberControllerInstance = new MovimentacaoTituloReceberController(movimentacaoTituloReceberServiceInstance);

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/:idTitulo', authenticateToken, movimentacaoTituloReceberControllerInstance.getAllMovimentacoesByTitulo);

module.exports = router;
