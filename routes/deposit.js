// ./routes/depositRoutes.js

const express = require('express');
const db = require("../models");
const depositService = require('../services/depositService'); // Ajuste o caminho conforme necessário
const DepositService = new depositService(db.Deposit); // Ajuste o caminho conforme necessário

const depositController = require('../controllers/depositController'); // Ajuste o caminho conforme necessário
const DepositController = new depositController(DepositService);

const { authenticateToken, logout } = require('../middleware/auth'); 

const router = express.Router();

router.post('/',authenticateToken, DepositController.createDeposit);
router.put('/:id',authenticateToken, DepositController.updateDeposit);
router.get('/',authenticateToken, DepositController.findAllDeposits);
router.get('/:id',authenticateToken, DepositController.findDepositById);
router.get('/:id/posicao',authenticateToken, DepositController.getPosicaoByDeposit);

module.exports = router;
