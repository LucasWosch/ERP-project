// ./models/quote.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Quote = sequelize.define('Quote', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        supplierId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Fornecedors',
                key: 'id'
            }
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        quoteDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        buyerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Use o modelo de Users para Buyer
                key: 'id'
            }
        },
        validityDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });

    Quote.associate = (models) => {
        Quote.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
        Quote.belongsTo(models.Fornecedor, { foreignKey: 'supplierId', as: 'supplier' });
        Quote.belongsTo(models.User, { foreignKey: 'buyerId', as: 'buyer',
            attributes: { exclude: ['password'] } });
    };

    return Quote;
};
