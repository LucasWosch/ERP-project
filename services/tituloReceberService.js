// ./services/tituloReceberService.js

const db = require('../models');

class TituloReceberService {
    constructor(tituloReceberModel, movimentacaoTituloReceberModel, movimentacaoProdutoService) {
        this.TituloReceber = tituloReceberModel;
        this.MovimentacaoTituloReceber = movimentacaoTituloReceberModel;
        this.MovimentacaoProduto = movimentacaoProdutoService;
    }

    async createTituloReceber(tituloReceberData, transaction) {
        try {
            const tituloReceber = await this.TituloReceber.create(tituloReceberData, { transaction });
            return tituloReceber;
        } catch (error) {
            throw error;
        }
    }

    async registerPayment(id, pagamentoData) {
        const t = await db.sequelize.transaction();
        try {
            const tituloReceber = await this.TituloReceber.findByPk(id);

            if (!tituloReceber) {
                throw new Error('TituloReceber not found');
            }

            if (tituloReceber.situacao === 'Pago') {
                throw new Error('TituloReceber already paid');
            }

            tituloReceber.situacao = 'Pago';
            await tituloReceber.save({ transaction: t });

            await this.MovimentacaoTituloReceber.create({
                idTitulo: tituloReceber.id,
                dataMov: new Date(),
                tipoMov: 'Pagamento',
                valorMov: pagamentoData.valorMov,
                vlrMulta: pagamentoData.vlrMulta,
                vlrJuros: pagamentoData.vlrJuros
            }, { transaction: t });

            // Obter detalhes da venda e gerar movimentação de saída para cada produto
            const venda = await db.Venda.findOne({
                where: { numeroNotaFiscal: tituloReceber.notaFiscal },
                include: [{ model: db.DetalheVenda, as: 'detalhes' }]
            });

            for (const detalhe of venda.detalhes) {
                await this.MovimentacaoProduto.createMovimentacaoProduto({
                    produtoId: detalhe.produtoId,
                    depositoId: null, // Defina o depósito apropriado
                    tipoMovimento: 'Saida.Venda',
                    quantidade: detalhe.qtVendida,
                    precoUnitario: detalhe.precoUnitarioDeVenda,
                    data: new Date()
                }, { transaction: t });
            }

            await t.commit();
            return tituloReceber;
        } catch (error) {
            await t.rollback();
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
