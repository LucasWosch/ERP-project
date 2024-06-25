// ./services/purchaseService.js

const db = require('../models');

class PurchaseService {
    constructor(purchaseModel, quoteService, tituloService, movimentacaoTituloService) {
        this.Purchase = purchaseModel;
        this.quoteService = quoteService;
        this.tituloService = tituloService;
        this.movimentacaoTituloService = movimentacaoTituloService;
    }

    async createPurchase(purchaseData) {
        const t = await db.sequelize.transaction();
        try {
            const { productId, depositoId, quantity, buyerId } = purchaseData;

            const bestQuote = await this.quoteService.findBestQuoteByProduct(productId);

            const purchase = await this.Purchase.create({
                ...purchaseData,
                supplierId: bestQuote.supplierId,
                quoteId: bestQuote.id,
                unitCost: bestQuote.price,
                status: 'Pending',
                depositoId: depositoId
            }, { transaction: t });

            // Criar Titulo
            const totalCost = bestQuote.price * quantity;
            const titulo = await this.tituloService.createTitulo({
                notaFiscal: bestQuote.id,
                nParcela: 1, // Assumindo uma parcela para simplificação
                vlrOriginal: totalCost,
                dtVcto: new Date(), // Data de vencimento pode ser ajustada conforme necessário
                situacao: 'Aberto'
            }, t);

            // Criar MovimentacaoTitulo para a abertura do título
            await this.movimentacaoTituloService.createMovimentacaoTitulo({
                idTitulo: titulo.id,
                dataMov: new Date(),
                tipoMov: 'Abertura',
                valorMov: totalCost,
                vlrMulta: 0,
                vlrJuros: 0
            }, t);

            await t.commit();
            return purchase;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async closePurchase(purchaseId) {
        const t = await db.sequelize.transaction();
        try {
            const purchase = await this.Purchase.findByPk(purchaseId);

            if (!purchase) {
                throw new Error('Purchase not found');
            }

            purchase.status = 'Closed';
            await purchase.save({ transaction: t });

            await db.MovimentacaoProduto.create({
                produtoId: purchase.productId,
                depositoId: purchase.depositoId,
                tipoMovimento: 'Entrada.Compra',
                quantidade: purchase.quantity,
                precoUnitario: purchase.unitCost,
                data: new Date()
            }, { transaction: t });

            await t.commit();
            return purchase;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async cancelPurchase(purchaseId) {
        try {
            const purchase = await this.Purchase.findByPk(purchaseId);

            if (!purchase) {
                throw new Error('Purchase not found');
            }

            purchase.status = 'Cancelled';
            await purchase.save();
            return purchase;
        } catch (error) {
            throw error;
        }
    }

    async findAllPurchases(page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const purchases = await this.Purchase.findAndCountAll({
                limit: pageSize,
                offset: offset
            });
            return purchases;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PurchaseService;
