// ./models/movimentacaoTitulo.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const MovimentacaoTitulo = sequelize.define('MovimentacaoTitulo', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idTitulo: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Titulos',
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

    MovimentacaoTitulo.associate = (models) => {
        MovimentacaoTitulo.belongsTo(models.Titulo, {
            foreignKey: 'idTitulo',
            as: 'titulo'
        });
    };

    return MovimentacaoTitulo;
};
