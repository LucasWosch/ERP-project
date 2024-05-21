// ./routes/costCenterRoutes.js

const express = require('express');
const db = require("../models");
const CostCenterService = require('../services/costCenterService'); // Ajuste o caminho conforme necessário
const costCenterServiceInstance = new CostCenterService(db.CostCenter);

const CostCenterController = require('../controllers/costCenterController'); // Ajuste o caminho conforme necessário
const costCenterControllerInstance = new CostCenterController(costCenterServiceInstance);

const { authenticateToken } = require('../middleware/auth'); // Ajuste o caminho conforme necessário

const router = express.Router();

router.post('/', authenticateToken, costCenterControllerInstance.createCostCenter);
router.put('/:id', authenticateToken, costCenterControllerInstance.updateCostCenter);
router.get('/', authenticateToken, costCenterControllerInstance.findAllCostCenters);
router.get('/:id', authenticateToken, costCenterControllerInstance.findCostCenterById);
router.delete('/:id', authenticateToken, costCenterControllerInstance.deleteCostCenter);

module.exports = router;
