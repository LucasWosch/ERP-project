// ./services/vendaService.js

const db = require('../models');

class VendaService {
    constructor(vendaModel, detalheVendaModel, tituloReceberService, movimentacaoTituloReceberService) {
        this.Venda = vendaModel;
        this.DetalheVenda = detalheVendaModel;
        this.tituloReceberService = tituloReceberService;
        this.movimentacaoTituloReceberService = movimentacaoTituloReceberService;
    }

    async createVenda(vendaData) {
        const t = await db.sequelize.transaction();
        try {
            const { numeroNotaFiscal, dataVenda, clienteId, detalhes } = vendaData;

            const venda = await this.Venda.create({
                numeroNotaFiscal,
                dataVenda,
                clienteId
            }, { transaction: t });

            for (const detalhe of detalhes) {
                await this.DetalheVenda.create({
                    vendaId: venda.id,
                    produtoId: detalhe.produtoId,
                    qtVendida: detalhe.qtVendida,
                    precoUnitarioDeVenda: detalhe.precoUnitarioDeVenda
                }, { transaction: t });
            }

            const totalValue = detalhes.reduce((sum, detalhe) => sum + (detalhe.qtVendida * detalhe.precoUnitarioDeVenda), 0);

            const titulo = await this.tituloReceberService.createTituloReceber({
                notaFiscal: numeroNotaFiscal,
                nParcela: 1,
                vlrOriginal: totalValue,
                dtVcto: dataVenda,
                situacao: 'Aberto'
            }, t);

            await this.movimentacaoTituloReceberService.createMovimentacaoTituloReceber({
                idTitulo: titulo.id,
                dataMov: new Date(),
                tipoMov: 'Abertura',
                valorMov: totalValue,
                vlrMulta: 0,
                vlrJuros: 0
            }, t);

            await t.commit();
            return venda;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async getAllVendas(page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const vendas = await this.Venda.findAndCountAll({
                limit: pageSize,
                offset,
                include: [
                    { model: db.DetalheVenda, as: 'detalhes' },
                    { model: db.Cliente, as: 'cliente' }
                ]
            });
            return vendas;
        } catch (error) {
            throw error;
        }
    }

    async getVendaById(id) {
        try {
            const venda = await this.Venda.findByPk(id, {
                include: [
                    { model: db.DetalheVenda, as: 'detalhes' },
                    { model: db.Cliente, as: 'cliente' }
                ]
            });
            return venda;
        } catch (error) {
            throw error;
        }
    }

    async getVendasByData(dataVenda) {
        try {
            const vendas = await this.Venda.findAll({
                where: { dataVenda },
                include: [
                    { model: db.DetalheVenda, as: 'detalhes' },
                    { model: db.Cliente, as: 'cliente' }
                ]
            });
            return vendas;
        } catch (error) {
            throw error;
        }
    }

    async getVendasByNumeroNotaFiscal(numeroNotaFiscal) {
        try {
            const vendas = await this.Venda.findAll({
                where: { numeroNotaFiscal },
                include: [
                    { model: db.DetalheVenda, as: 'detalhes' },
                    { model: db.Cliente, as: 'cliente' }
                ]
            });
            return vendas;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = VendaService;
