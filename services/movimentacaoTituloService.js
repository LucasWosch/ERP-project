// ./services/movimentacaoTituloService.js

const db = require('../models');

class MovimentacaoTituloService {
    constructor(movimentacaoTituloModel) {
        this.MovimentacaoTitulo = movimentacaoTituloModel;
    }

    async createMovimentacaoTitulo(movimentacaoTituloData) {
        try {
            const movimentacaoTitulo = await this.MovimentacaoTitulo.create(movimentacaoTituloData);
            return movimentacaoTitulo;
        } catch (error) {
            throw error;
        }
    }

    async getAllMovimentacoesByTitulo(idTitulo) {
        try {
            const movimentacoes = await this.MovimentacaoTitulo.findAll({
                where: { idTitulo }
            });
            return movimentacoes;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MovimentacaoTituloService;
