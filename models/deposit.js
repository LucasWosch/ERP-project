// ./models/deposit.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Deposit = sequelize.define('Deposit', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ativo: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
    return Deposit;
};
