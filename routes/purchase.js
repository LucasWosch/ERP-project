// ./routes/purchaseRoutes.js

const express = require('express');
const db = require('../models');
const PurchaseService = require('../services/purchaseService');
const QuoteService = require('../services/quoteService');
const TituloService = require('../services/tituloService');
const MovimentacaoTituloService = require('../services/movimentacaoTituloService');

const quoteServiceInstance = new QuoteService(db.Quote);
const tituloServiceInstance = new TituloService(db.Titulo, db.MovimentacaoTitulo);
const movimentacaoTituloServiceInstance = new MovimentacaoTituloService(db.MovimentacaoTitulo);
const purchaseServiceInstance = new PurchaseService(db.Purchase, quoteServiceInstance, tituloServiceInstance, movimentacaoTituloServiceInstance);

const PurchaseController = require('../controllers/purchaseController');
const purchaseControllerInstance = new PurchaseController(purchaseServiceInstance);

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, purchaseControllerInstance.createPurchase);
router.put('/:id/close', authenticateToken, purchaseControllerInstance.closePurchase);
router.put('/:id/cancel', authenticateToken, purchaseControllerInstance.cancelPurchase);

module.exports = router;
