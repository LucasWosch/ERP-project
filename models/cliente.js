// ./models/cliente.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Cliente = sequelize.define('Cliente', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cpf: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    Cliente.associate = (models) => {
        Cliente.hasMany(models.Venda, { foreignKey: 'clienteId', as: 'vendas' });
    };

    return Cliente;
};
