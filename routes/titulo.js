// ./routes/tituloRoutes.js

const express = require('express');
const db = require('../models');
const TituloService = require('../services/tituloService');
const MovimentacaoTituloService = require('../services/movimentacaoTituloService');

const tituloServiceInstance = new TituloService(db.Titulo, db.MovimentacaoTitulo);
const movimentacaoTituloServiceInstance = new MovimentacaoTituloService(db.MovimentacaoTitulo);

const TituloController = require('../controllers/tituloController');
const tituloControllerInstance = new TituloController(tituloServiceInstance);

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, tituloControllerInstance.createTitulo);
router.get('/', authenticateToken, tituloControllerInstance.getAllTitulos);
router.get('/:id', authenticateToken, tituloControllerInstance.getTituloById);

module.exports = router;
