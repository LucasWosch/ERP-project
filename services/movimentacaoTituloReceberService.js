// ./services/movimentacaoTituloReceberService.js

const db = require('../models');

class MovimentacaoTituloReceberService {
    constructor(movimentacaoTituloReceberModel) {
        this.MovimentacaoTituloReceber = movimentacaoTituloReceberModel;
    }

    async createMovimentacaoTituloReceber(movimentacaoTituloReceberData, transaction) {
        try {
            const movimentacaoTituloReceber = await this.MovimentacaoTituloReceber.create(movimentacaoTituloReceberData, { transaction });
            return movimentacaoTituloReceber;
        } catch (error) {
            throw error;
        }
    }

    async getAllMovimentacoesByTitulo(idTitulo) {
        try {
            const movimentacoes = await this.MovimentacaoTituloReceber.findAll({
                where: { idTitulo }
            });
            return movimentacoes;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MovimentacaoTituloReceberService;
