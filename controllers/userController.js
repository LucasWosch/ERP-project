// ./controllers/userController.js
const userService = require('../services/userService'); // Ajuste o caminho conforme necessário

class userController{
    constructor(userService){
        this.userService = userService;
    }

    async create(req, res){
        const {name, mail, password} = req.body;
        try {
            const newUser = await this.userService.create(name, mail, password);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async login(req, res) {
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

    async findUserByEmail(req, res) {
        try {
            const { mail } = req.body;  // Supõe que o e-mail está disponível em req.user
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

    async findAllUsers(req, res) {
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
/*
const UserController = {
    createUser: async (req, res) => {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await UserService.getUserById(req.params.id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const updatedUser = await UserService.updateUser(req.params.id, req.body);
            if (updatedUser[0] > 0) {
                res.status(200).json({ message: 'User updated successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const deletedUser = await UserService.deleteUser(req.params.id);
            if (deletedUser > 0) {
                res.status(200).json({ message: 'User deleted successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
*/
module.exports = userController;
