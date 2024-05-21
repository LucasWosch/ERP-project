// ./routes/depositRoutes.js

const express = require('express');
const db = require("../models");
const DepositService = require('../services/depositService'); // Ajuste o caminho conforme necessário

const depositServiceInstance = new DepositService(db.Deposit); // Ajuste o caminho conforme necessário

const DepositController = require('../controllers/depositController'); // Ajuste o caminho conforme necessário
const depositControllerInstance = new DepositController(depositServiceInstance);

const { authenticateToken, logout } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, (req, res) => depositControllerInstance.createDeposit(req, res));
router.put('/:id', authenticateToken, (req, res) => depositControllerInstance.updateDeposit(req, res));
router.get('/', authenticateToken, (req, res) => depositControllerInstance.findAllDeposits(req, res));
router.get('/:id', authenticateToken, (req, res) => depositControllerInstance.findDepositById(req, res));
router.get('/:id/posicao', authenticateToken, (req, res) => depositControllerInstance.getPosicaoByDeposit(req, res));

module.exports = router;
