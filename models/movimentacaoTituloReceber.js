// ./models/movimentacaoTituloReceber.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const MovimentacaoTituloReceber = sequelize.define('MovimentacaoTituloReceber', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idTitulo: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'TituloRecebers',
                key: 'id'
            }
        },
        dataMov: {
            type: Sequelize.DATE,
            allowNull: false
        },
        tipoMov: {
            type: Sequelize.STRING,
            allowNull: false // Possible values: 'Abertura', 'Pagamento'
        },
        valorMov: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        vlrMulta: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
        vlrJuros: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        }
    });

    MovimentacaoTituloReceber.associate = (models) => {
        MovimentacaoTituloReceber.belongsTo(models.TituloReceber, { foreignKey: 'idTitulo', as: 'titulo' });
    };

    return MovimentacaoTituloReceber;
};
