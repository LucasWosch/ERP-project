// ./models/user.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mail: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dt_nasc: {
            type: Sequelize.DATE
        },
        departmentId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Departments',
                key: 'id'
            }
        }
    });

    User.associate = (models) => {
        User.belongsTo(models.Department, { foreignKey: 'departmentId', as: 'department' });
    };

    return User;
};
