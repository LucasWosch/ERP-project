// ./routes/purchaseRoutes.js

const express = require('express');
const db = require('../models');
const PurchaseService = require('../services/purchaseService');
const purchaseServiceInstance = new PurchaseService(db.Purchase);

const PurchaseController = require('../controllers/purchaseController');
const purchaseControllerInstance = new PurchaseController(purchaseServiceInstance);

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, purchaseControllerInstance.createPurchase);
router.put('/:id/complete', authenticateToken, purchaseControllerInstance.completePurchase);
router.get('/', authenticateToken, purchaseControllerInstance.findAllPurchases);
router.get('/:id', authenticateToken, purchaseControllerInstance.findPurchaseById);
router.put('/:id/cancel', authenticateToken, purchaseControllerInstance.cancelPurchase);

module.exports = router;
