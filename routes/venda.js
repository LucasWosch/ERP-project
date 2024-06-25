// ./routes/vendaRoutes.js

const express = require('express');
const db = require('../models');
const VendaService = require('../services/vendaService');
const TituloReceberService = require('../services/tituloReceberService');
const MovimentacaoTituloReceberService = require('../services/movimentacaoTituloReceberService');

const tituloReceberServiceInstance = new TituloReceberService(db.TituloReceber, db.MovimentacaoTituloReceber);
const movimentacaoTituloReceberServiceInstance = new MovimentacaoTituloReceberService(db.MovimentacaoTituloReceber);
const vendaServiceInstance = new VendaService(db.Venda, db.DetalheVenda, tituloReceberServiceInstance, movimentacaoTituloReceberServiceInstance);

const VendaController = require('../controllers/vendaController');
const vendaControllerInstance = new VendaController(vendaServiceInstance);

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, vendaControllerInstance.createVenda);
router.get('/', authenticateToken, vendaControllerInstance.getAllVendas);
router.get('/:id', authenticateToken, vendaControllerInstance.getVendaById);
router.get('/data/:dataVenda', authenticateToken, vendaControllerInstance.getVendasByData);
router.get('/notaFiscal/:numeroNotaFiscal', authenticateToken, vendaControllerInstance.getVendasByNumeroNotaFiscal);

module.exports = router;
