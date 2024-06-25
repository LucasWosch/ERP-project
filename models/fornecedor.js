// ./models/fornecedor.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Fornecedor = sequelize.define('Fornecedor', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        telefone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ativo: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
    return Fornecedor;
};
