// ./models/movimentacaoProduto.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const MovimentacaoProduto = sequelize.define('MovimentacaoProduto', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tipoMovimento: {
            type: Sequelize.ENUM('Entrada.Compra', 'Saida.Compra', 'Entrada.Transferência', 'Saida.Transferência'),
            allowNull: false
        },
        quantidade: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        precoUnitario: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        data: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });

    MovimentacaoProduto.associate = (models) => {
        MovimentacaoProduto.belongsTo(models.Deposit, {
            foreignKey: {
                name: 'depositoId',
                allowNull: false
            }
        });
        MovimentacaoProduto.belongsTo(models.Product, {
            foreignKey: {
                name: 'produtoId',
                allowNull: false
            }
        });
    };

    return MovimentacaoProduto;
};
