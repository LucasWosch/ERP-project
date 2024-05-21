// ./routes/requisitionRoutes.js

const express = require('express');
const db = require('../models');
const RequisitionService = require('../services/requisitionService');
const requisitionServiceInstance = new RequisitionService(db.Requisition);

const RequisitionController = require('../controllers/requisitionController');
const requisitionControllerInstance = new RequisitionController(requisitionServiceInstance);

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, requisitionControllerInstance.createRequisition);
router.put('/:id/cancel', authenticateToken, requisitionControllerInstance.cancelRequisition);
router.put('/:id/fulfill', authenticateToken, requisitionControllerInstance.fulfillRequisition);
router.get('/', authenticateToken, requisitionControllerInstance.findAllRequisitions);
router.get('/:id', authenticateToken, requisitionControllerInstance.findRequisitionById);

module.exports = router;
