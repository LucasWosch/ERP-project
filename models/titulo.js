// ./models/titulo.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Titulo = sequelize.define('Titulo', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        notaFiscal: {
            type: Sequelize.INTEGER,
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
            defaultValue: 'Aberto' // Possible values: 'Aberto', 'Pago'
        }
    });

    Titulo.associate = (models) => {
        Titulo.hasMany(models.MovimentacaoTitulo, {
            foreignKey: 'idTitulo',
            as: 'movimentacoes'
        });
    };

    return Titulo;
};
