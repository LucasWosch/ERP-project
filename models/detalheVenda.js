// ./models/detalheVenda.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const DetalheVenda = sequelize.define('DetalheVenda', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        vendaId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Vendas',
                key: 'id'
            }
        },
        produtoId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Produtos',
                key: 'id'
            }
        },
        qtVendida: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        precoUnitarioDeVenda: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    });

    DetalheVenda.associate = (models) => {
        DetalheVenda.belongsTo(models.Venda, { foreignKey: 'vendaId', as: 'venda' });
        DetalheVenda.belongsTo(models.Produto, { foreignKey: 'produtoId', as: 'produto' });
    };

    return DetalheVenda;
};
