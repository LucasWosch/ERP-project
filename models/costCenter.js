// ./models/costCenter.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const CostCenter = sequelize.define('CostCenter', {
        code: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return CostCenter;
};
