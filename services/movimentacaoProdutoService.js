// ./services/movimentacaoProdutoService.js

const db = require('../models'); // Ajuste o caminho conforme necessário
const { Op } = require('sequelize'); // Certifique-se de importar o operador correto

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

    async calculateStock(produtoId) {
        try {
            const movimentacoes = await this.MovimentacaoProduto.findAll({
                where: { produtoId }
            });

            let totalEntrada = 0;
            let totalSaida = 0;

            movimentacoes.forEach(mov => {
                if (mov.tipoMovimento.includes('Entrada')) {
                    totalEntrada += mov.quantidade;
                } else if (mov.tipoMovimento.includes('Saida')) {
                    totalSaida += mov.quantidade;
                }
            });

            return totalEntrada - totalSaida;
        } catch (error) {
            throw error;
        }
    }

    // Novo método para buscar a última movimentação de entrada

    async findLatestEntradaByProductId(produtoId) {
        try {
            return await this.MovimentacaoProduto.findOne({
                where: {
                    produtoId: produtoId,
                    tipoMovimento: {
                        [Op.like]: '%Entrada%' // Usando LIKE para correspondência parcial
                    }
                },
                order: [['data', 'DESC']]
            });
        } catch (error) {
            throw error;
        }
    }
}


module.exports = MovimentacaoProdutoService;
