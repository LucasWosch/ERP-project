// ./routes/departmentRoutes.js

const express = require('express');
const db = require("../models");
const DepartmentService = require('../services/departmentService'); // Ajuste o caminho conforme necessário
const departmentServiceInstance = new DepartmentService(db.Department); // Ajuste o caminho conforme necessário

const DepartmentController = require('../controllers/departmentController'); // Ajuste o caminho conforme necessário
const departmentControllerInstance = new DepartmentController(departmentServiceInstance);

const { authenticateToken } = require('../middleware/auth'); // Ajuste o caminho conforme necessário

const router = express.Router();

router.post('/', authenticateToken, departmentControllerInstance.createDepartment);
router.put('/:id', authenticateToken, departmentControllerInstance.updateDepartment);
router.get('/', authenticateToken, departmentControllerInstance.findAllDepartments);
router.get('/:id', authenticateToken, departmentControllerInstance.findDepartmentById);

module.exports = router;
