// ./models/costCenter.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const CostCenter = sequelize.define('CostCenter', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        departmentId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Departments',
                key: 'id'
            }
        }
    });

    CostCenter.associate = (models) => {
        CostCenter.belongsTo(models.Department, {
            foreignKey: 'departmentId',
            as: 'department'
        });
    };

    return CostCenter;
};
