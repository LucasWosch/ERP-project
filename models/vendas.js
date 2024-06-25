// ./models/venda.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Venda = sequelize.define('Venda', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        numeroNotaFiscal: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dataVenda: {
            type: Sequelize.DATE,
            allowNull: false
        },
        clienteId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Clientes',
                key: 'id'
            }
        }
    });

    Venda.associate = (models) => {
        Venda.belongsTo(models.Cliente, { foreignKey: 'clienteId', as: 'cliente' });
        Venda.hasMany(models.DetalheVenda, { foreignKey: 'vendaId', as: 'detalhes' });
    };

    return Venda;
};
