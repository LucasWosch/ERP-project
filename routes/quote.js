// ./routes/quoteRoutes.js

const express = require('express');
const db = require('../models');
const QuoteService = require('../services/quoteService');
const quoteServiceInstance = new QuoteService(db.Quote);

const QuoteController = require('../controllers/quoteController');
const quoteControllerInstance = new QuoteController(quoteServiceInstance);

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, quoteControllerInstance.createQuote);
router.get('/:productId', authenticateToken, quoteControllerInstance.findQuotesByProduct);

module.exports = router;
