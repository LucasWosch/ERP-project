// ./models/purchase.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Purchase = sequelize.define('Purchase', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        supplierId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Fornecedors',
                key: 'id'
            }
        },
        quoteId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Quotes',
                key: 'id'
            }
        },
        buyerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        unitCost: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'Pending'
        },
        depositoId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Deposits',
                key: 'id'
            }
        }
    });

    Purchase.associate = (models) => {
        Purchase.belongsTo(models.Fornecedor, { foreignKey: 'supplierId', as: 'supplier' });
        Purchase.belongsTo(models.Quote, { foreignKey: 'quoteId', as: 'quote' });
        Purchase.belongsTo(models.User, { foreignKey: 'buyerId', as: 'buyer' ,
            attributes: { exclude: ['password'] } });
        Purchase.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
        Purchase.belongsTo(models.Deposit, { foreignKey: 'depositoId', as: 'deposit' });
    };

    return Purchase;
};
