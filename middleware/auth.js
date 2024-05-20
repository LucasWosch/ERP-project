const jwt = require('jsonwebtoken');
const SECRET_KEY = 'seu_secret_key_aqui';  // Use uma chave segura e armazene-a em variáveis de ambiente

// Cria um armazenamento simples em memória para a lista negra de tokens
let tokenBlacklist = new Set();

// Função para gerar o token JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '24h' });
};

// Middleware para verificar o token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Bearer Token

    if (token == null) {
        return res.sendStatus(401);  // Sem token, acesso não autorizado
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);  // Token inválido
        }

        req.user = user;
        next();  // Prosseguir para a próxima middleware/route handler
    });
};



module.exports = {
    authenticateToken,
    generateToken
};
