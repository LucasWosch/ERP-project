// ./routes/supplierRoutes.js

const express = require('express');
const db = require("../models");
const SupplierService = require('../services/supplierService'); // Ajuste o caminho conforme necessário
const supplierServiceInstance = new SupplierService(db.Supplier);

const SupplierController = require('../controllers/supplierController'); // Ajuste o caminho conforme necessário
const supplierControllerInstance = new SupplierController(supplierServiceInstance);

const { authenticateToken } = require('../middleware/auth'); // Ajuste o caminho conforme necessário

const router = express.Router();

router.post('/', authenticateToken, supplierControllerInstance.createSupplier);
router.put('/:id', authenticateToken, supplierControllerInstance.updateSupplier);
router.get('/', authenticateToken, supplierControllerInstance.findAllSuppliers);
router.get('/:id', authenticateToken, supplierControllerInstance.findSupplierById);
router.delete('/:id', authenticateToken, supplierControllerInstance.deleteSupplier);

module.exports = router;
