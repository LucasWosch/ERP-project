// ./routes/costCenterRoutes.js

const express = require('express');
const db = require("../models");
const CostCenterService = require('../services/costCenterService'); // Ajuste o caminho conforme necessário
const costCenterServiceInstance = new CostCenterService(db.CostCenter); // Ajuste o caminho conforme necessário

const CostCenterController = require('../controllers/costCenterController'); // Ajuste o caminho conforme necessário
const costCenterControllerInstance = new CostCenterController(costCenterServiceInstance);

const { authenticateToken } = require('../middleware/auth'); // Ajuste o caminho conforme necessário

const router = express.Router();

router.post('/', authenticateToken, costCenterControllerInstance.createCostCenter);
router.put('/:code', authenticateToken, costCenterControllerInstance.updateCostCenter);
router.get('/', authenticateToken, costCenterControllerInstance.findAllCostCenters);
router.get('/:code', authenticateToken, costCenterControllerInstance.findCostCenterByCode);
router.delete('/:code', authenticateToken, costCenterControllerInstance.deleteCostCenter);

module.exports = router;
