// ./routes/tituloReceberRoutes.js

const express = require('express');
const db = require('../models');
const TituloReceberService = require('../services/tituloReceberService');

const tituloReceberServiceInstance = new TituloReceberService(db.TituloReceber, db.MovimentacaoTituloReceber);

const TituloReceberController = require('../controllers/tituloReceberController');
const tituloReceberControllerInstance = new TituloReceberController(tituloReceberServiceInstance);

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, tituloReceberControllerInstance.getAllTitulosReceber);
router.get('/:id', authenticateToken, tituloReceberControllerInstance.getTituloReceberById);

module.exports = router;
