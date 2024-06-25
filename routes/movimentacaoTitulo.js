// ./routes/movimentacaoTituloRoutes.js

const express = require('express');
const db = require('../models');
const MovimentacaoTituloService = require('../services/movimentacaoTituloService');

const movimentacaoTituloServiceInstance = new MovimentacaoTituloService(db.MovimentacaoTitulo);

const MovimentacaoTituloController = require('../controllers/movimentacaoTituloController');
const movimentacaoTituloControllerInstance = new MovimentacaoTituloController(movimentacaoTituloServiceInstance);

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, movimentacaoTituloControllerInstance.createMovimentacaoTitulo);
router.get('/:idTitulo', authenticateToken, movimentacaoTituloControllerInstance.getAllMovimentacoesByTitulo);

module.exports = router;
