// ./routes/productRoutes.js

const express = require('express');
const db = require("../models");
const ProductService = require('../services/productService'); // Ajuste o caminho conforme necessário
const productServiceInstance = new ProductService(db.Product); // Ajuste o caminho conforme necessário

const ProductController = require('../controllers/productController'); // Ajuste o caminho conforme necessário
const productControllerInstance = new ProductController(productServiceInstance);

const { authenticateToken, logout } = require('../middleware/auth'); 

const router = express.Router();

router.post('/', authenticateToken, productControllerInstance.createProduct);
router.put('/:id', authenticateToken, productControllerInstance.updateProduct);
router.get('/', authenticateToken, productControllerInstance.findAllProducts);
router.get('/:id', authenticateToken, productControllerInstance.findProductById);

module.exports = router;
