// ./routes/quotationRoutes.js

const express = require('express');
const db = require('../models');
const QuotationService = require('../services/quotationService');
const quotationServiceInstance = new QuotationService(db.Quotation);

const QuotationController = require('../controllers/quotationController');
const quotationControllerInstance = new QuotationController(quotationServiceInstance);

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, quotationControllerInstance.createQuotation);
router.get('/', authenticateToken, quotationControllerInstance.findAllQuotations);
router.get('/:id', authenticateToken, quotationControllerInstance.findQuotationById);

module.exports = router;
