// ./controllers/userController.js
const UserService = require('../services/userService');

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    create = async (req, res) => {
        const { name, mail, password, departmentId } = req.body;
        try {
            const newUser = await this.userService.create(name, mail, password, departmentId);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    login = async (req, res) => {
        try {
            const { mail, password } = req.body;
            const result = await this.userService.login(mail, password);
            if (result) {
                res.json(result);
            } else {
                res.status(401).json({ message: "E-mail ou senha inválidos." });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    findUserByEmail = async (req, res) => {
        try {
            const { mail } = req.body;
            const user = await this.userService.findUserByEmail(mail);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "Usuário não encontrado." });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    findAllUsers = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const result = await this.userService.findAllUsers(page, limit);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;
