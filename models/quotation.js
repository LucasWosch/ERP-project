// ./models/quotation.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Quotation = sequelize.define('Quotation', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        price: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        quotationDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        validityDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });

    Quotation.associate = (models) => {
        Quotation.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'produto'
        });
        Quotation.belongsTo(models.Supplier, {
            foreignKey: 'supplierId',
            as: 'fornecedor'
        });
        Quotation.belongsTo(models.User, {
            foreignKey: 'buyerId',
            as: 'comprador'
        });
    };

    return Quotation;
};
