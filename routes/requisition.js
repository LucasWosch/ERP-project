// ./routes/requisitionRoutes.js

const express = require('express');
const db = require("../models");
const RequisitionService = require('../services/requisitionService'); // Ajuste o caminho conforme necessário
const MovimentacaoProdutoService = require('../services/movimentacaoProdutoService'); // Ajuste o caminho conforme necessário
const QuoteService = require('../services/quoteService'); // Ajuste o caminho conforme necessário
const movimentacaoProdutoServiceInstance = new MovimentacaoProdutoService(db.MovimentacaoProduto); // Ajuste o caminho conforme necessário
const quoteServiceInstance = new QuoteService(db.Quote); // Ajuste o caminho conforme necessário
const requisitionServiceInstance = new RequisitionService(db.Requisition, movimentacaoProdutoServiceInstance, quoteServiceInstance); // Ajuste o caminho conforme necessário

const RequisitionController = require('../controllers/requisitionController'); // Ajuste o caminho conforme necessário
const requisitionControllerInstance = new RequisitionController(requisitionServiceInstance, movimentacaoProdutoServiceInstance, quoteServiceInstance);

const { authenticateToken } = require('../middleware/auth'); // Ajuste o caminho conforme necessário

const router = express.Router();

router.post('/', authenticateToken, requisitionControllerInstance.createRequisition);
router.put('/:id/cancel', authenticateToken, requisitionControllerInstance.cancelRequisition);
router.get('/', authenticateToken, requisitionControllerInstance.getAllRequisitions);
router.get('/:id', authenticateToken, requisitionControllerInstance.getRequisitionById);

module.exports = router;
