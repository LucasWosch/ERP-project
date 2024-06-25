// ./models/tituloReceber.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const TituloReceber = sequelize.define('TituloReceber', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        notaFiscal: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nParcela: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        vlrOriginal: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        dtVcto: {
            type: Sequelize.DATE,
            allowNull: false
        },
        situacao: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'Aberto'
        }
    });

    TituloReceber.associate = (models) => {
        TituloReceber.hasMany(models.MovimentacaoTituloReceber, { foreignKey: 'idTitulo', as: 'movimentacoes' });
    };

    return TituloReceber;
};
