// ./services/tituloService.js

const db = require('../models');

class TituloService {
    constructor(tituloModel, movimentacaoTituloModel) {
        this.Titulo = tituloModel;
        this.MovimentacaoTitulo = movimentacaoTituloModel;
    }

    async createTitulo(tituloData) {
        const t = await db.sequelize.transaction();
        try {
            const titulo = await this.Titulo.create(tituloData, { transaction: t });
            await this.MovimentacaoTitulo.create({
                idTitulo: titulo.id,
                dataMov: new Date(),
                tipoMov: 'Abertura',
                valorMov: tituloData.vlrOriginal
            }, { transaction: t });

            await t.commit();
            return titulo;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async getAllTitulos(page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const titulos = await this.Titulo.findAndCountAll({
                limit: pageSize,
                offset,
                include: [{ model: db.MovimentacaoTitulo, as: 'movimentacoes' }]
            });
            return titulos;
        } catch (error) {
            throw error;
        }
    }

    async getTituloById(id) {
        try {
            const titulo = await this.Titulo.findByPk(id, {
                include: [{ model: db.MovimentacaoTitulo, as: 'movimentacoes' }]
            });
            return titulo;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TituloService;
