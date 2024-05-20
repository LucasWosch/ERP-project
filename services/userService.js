

const bcrypt = require('bcryptjs');
const db = require('../models'); // Ajuste o caminho conforme necessário
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'seu_secret_key_aqui';  // Use uma chave secreta segura e armazene-a em variáveis de ambiente
const { generateToken } = require('../middleware/auth');  

class userService {
    constructor(userModel) {
        this.User = userModel;
    }

    async create(name, mail, password) {
        try {
            const newUser = await this.User.create({
                name: name,
                mail: mail,
                password: bcrypt.hashSync(password, 10)  // Corrigindo para usar hashSync
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
                return null;  // Usuário não encontrado
            }

            // Verificar se a senha está correta
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return null;  // Senha inválida
            }

            // Gerar um token JWT usando a função centralizada
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
                attributes: { exclude: ['password'] }  // Exclui a senha dos resultados
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
                order: [['createdAt', 'DESC']]  // Ordena por data de criação, ajuste conforme necessário
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

module.exports = userService;