// ./models/requisition.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Requisition = sequelize.define('Requisition', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('pending', 'cancelled', 'fulfilled'),
            defaultValue: 'pending'
        }
    });

    Requisition.associate = (models) => {
        Requisition.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'requerente'
        });
        Requisition.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'produto'
        });
        Requisition.belongsTo(models.CostCenter, {
            foreignKey: 'costCenterId',
            as: 'centroDeCusto'
        });
    };

    return Requisition;
};
