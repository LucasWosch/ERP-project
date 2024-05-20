// ./models/product.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Product = sequelize.define('Product', {
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
    return Product;
};
