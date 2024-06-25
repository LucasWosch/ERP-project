// ./services/tituloReceberService.js

const db = require('../models');

class TituloReceberService {
    constructor(tituloReceberModel, movimentacaoTituloReceberModel) {
        this.TituloReceber = tituloReceberModel;
        this.MovimentacaoTituloReceber = movimentacaoTituloReceberModel;
    }

    async createTituloReceber(tituloReceberData, transaction) {
        try {
            const tituloReceber = await this.TituloReceber.create(tituloReceberData, { transaction });
            return tituloReceber;
        } catch (error) {
            throw error;
        }
    }

    async getAllTitulosReceber(page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const titulos = await this.TituloReceber.findAndCountAll({
                limit: pageSize,
                offset,
                include: [{ model: db.MovimentacaoTituloReceber, as: 'movimentacoes' }]
            });
            return titulos;
        } catch (error) {
            throw error;
        }
    }

    async getTituloReceberById(id) {
        try {
            const tituloReceber = await this.TituloReceber.findByPk(id, {
                include: [{ model: db.MovimentacaoTituloReceber, as: 'movimentacoes' }]
            });
            return tituloReceber;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TituloReceberService;
