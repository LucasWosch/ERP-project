// ./services/userService.js

const bcrypt = require('bcryptjs');
const db = require('../models'); // Ajuste o caminho conforme necessário
const { generateToken } = require('../middleware/auth');  

class UserService {
    constructor(userModel) {
        this.User = userModel;
    }

    async create(name, mail, password, departmentId) {
        try {
            const newUser = await this.User.create({
                name: name,
                mail: mail,
                password: bcrypt.hashSync(password, 10),
                departmentId: departmentId
            });
            newUser.password = "";
            return newUser ? newUser : null;
        } catch (error) {
            throw error;
        }
    }

    async login(mail, password) {
        try {
            const user = await this.User.findOne({ where: { mail: mail } });
            if (!user) {
                return null;
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return null;
            }

            const token = generateToken(user.id);
            return {  token };
        } catch (error) {
            throw error;
        }
    }

    async findUserByEmail(email) {
        try {
            const user = await this.User.findOne({
                where: { mail: email },
                attributes: { exclude: ['password'] }
            });
            return user ? user : null;
        } catch (error) {
            throw error;
        }
    }

    async findAllUsers(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        try {
            const { count, rows } = await this.User.findAndCountAll({
                attributes: { exclude: ['password'] },
                limit,
                offset,
                include: [{ model: db.Department, as: 'department' }],
                order: [['createdAt', 'DESC']]
            });

            return {
                total: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                users: rows
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
