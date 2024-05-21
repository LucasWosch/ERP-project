// ./models/purchase.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Purchase = sequelize.define('Purchase', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        unitCost: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('pending', 'completed', 'cancelled'),
            defaultValue: 'pending'
        }
    });

    Purchase.associate = (models) => {
        Purchase.belongsTo(models.Supplier, {
            foreignKey: 'supplierId',
            as: 'fornecedor'
        });
        Purchase.belongsTo(models.Quotation, {
            foreignKey: 'quotationId',
            as: 'cotacao'
        });
        Purchase.belongsTo(models.User, {
            foreignKey: 'buyerId',
            as: 'comprador'
        });
        Purchase.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'produto'
        });
    };

    return Purchase;
};
