// ./services/movimentacaoProdutoService.js

const db = require('../models'); // Ajuste o caminho conforme necessário

class MovimentacaoProdutoService {
    constructor(movimentacaoProdutoModel) {
        this.MovimentacaoProduto = movimentacaoProdutoModel;
    }
    
    async createMovimentacaoProduto(movimentacaoData) {
        try {
            const movimentacaoProduto = await this.MovimentacaoProduto.create(movimentacaoData);
            return movimentacaoProduto;
        } catch (error) {
            throw error;
        }
    }

    async findAllMovimentacoesProduto() {
        try {
            const movimentacoesProduto = await this.MovimentacaoProduto.findAll();
            return movimentacoesProduto;
        } catch (error) {
            throw error;
        }
    }

    async findByProduto(produtoId, page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const movimentacoesProduto = await this.MovimentacaoProduto.findAndCountAll({
                where: { produtoId },
                limit: pageSize,
                offset: offset
            });
            return movimentacoesProduto;
        } catch (error) {
            throw error;
        }
    }

    async findByDeposito(depositoId, page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const movimentacoesProduto = await this.MovimentacaoProduto.findAndCountAll({
                where: { depositoId },
                limit: pageSize,
                offset: offset
            });
            return movimentacoesProduto;
        } catch (error) {
            throw error;
        }
    }

    async findByData(intervaloData, page, pageSize) {
        try {
            const { startDate, endDate } = intervaloData;
            const offset = (page - 1) * pageSize;
            const movimentacoesProduto = await this.MovimentacaoProduto.findAndCountAll({
                where: {
                    data: {
                        [db.Sequelize.Op.between]: [startDate, endDate]
                    }
                },
                limit: pageSize,
                offset: offset
            });
            return movimentacoesProduto;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MovimentacaoProdutoService;
