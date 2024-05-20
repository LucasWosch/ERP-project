// ./routes/userRoutes.js

const express = require('express');
const db = require("../models");
const userService = require('../services/userService'); // Ajuste o caminho conforme necessário
const UserService = new userService(db.User); // Ajuste o caminho conforme necessário

const userController = require('../controllers/userController'); // Ajuste o caminho conforme necessário
const UserController = new userController(UserService);

const { authenticateToken, logout } = require('../middleware/auth'); 


const router = express.Router();

router.get('/', function(req, res) {
    res.send("USER OK");
});

router.post('/create', function(req, res) {
    UserController.create(req, res);
});

// Adicionando a rota de login
router.post('/login', function(req, res) {
    UserController.login(req, res);
});

router.post('/findUser', authenticateToken, function(req, res) {
    UserController.findUserByEmail(req, res);
});

router.get('/findAll', authenticateToken, function(req, res) {
    UserController.findAllUsers(req, res);
});

module.exports = router;

