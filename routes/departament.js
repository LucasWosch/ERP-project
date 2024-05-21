// ./routes/departmentRoutes.js

const express = require('express');
const db = require("../models");
const DepartmentService = require('../services/departmentService');
const departmentServiceInstance = new DepartmentService(db.Department);

const DepartmentController = require('../controllers/departmentController');
const departmentControllerInstance = new DepartmentController(departmentServiceInstance);

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, departmentControllerInstance.createDepartment);
router.put('/:id', authenticateToken, departmentControllerInstance.updateDepartment);
router.get('/', authenticateToken, departmentControllerInstance.findAllDepartments);
router.get('/:id', authenticateToken, departmentControllerInstance.findDepartmentById);
router.delete('/:id', authenticateToken, departmentControllerInstance.deleteDepartment);

module.exports = router;
