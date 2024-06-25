// ./models/department.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Department = sequelize.define('Department', {
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
    return Department;
};
