// ./models/requisition.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Requisition = sequelize.define('Requisition', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
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
        costCenterCode: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'CostCenters',
                key: 'code'
            }
        },
        depositoId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Deposits',
                key: 'id'
            }
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'Pending' // Possible values: 'Pending', 'Fulfilled', 'Cancelled'
        }
    });

    Requisition.associate = (models) => {
        Requisition.belongsTo(models.User, { foreignKey: 'userId', as: 'user' ,
            attributes: { exclude: ['password'] } });
        Requisition.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
        Requisition.belongsTo(models.CostCenter, { foreignKey: 'costCenterCode', as: 'costCenter' });
        Requisition.belongsTo(models.Deposit, { foreignKey: 'depositoId', as: 'deposito' });
    };

    return Requisition;
};
