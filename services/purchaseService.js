// ./services/purchaseService.js

const db = require('../models');

class PurchaseService {
    constructor(purchaseModel) {
        this.Purchase = purchaseModel;
    }

    async createPurchase(purchaseData) {
        try {
            const quotations = await db.Quotation.findAll({
                where: { productId: purchaseData.productId }
            });

            if (quotations.length < 3) {
                throw new Error('At least 3 quotations are required to make a purchase');
            }

            const bestQuotation = quotations.reduce((prev, current) => (prev.price < current.price ? prev : current));
            purchaseData.quotationId = bestQuotation.id;
            purchaseData.unitCost = bestQuotation.price;

            const purchase = await this.Purchase.create(purchaseData);
            return purchase;
        } catch (error) {
            throw error;
        }
    }

    async completePurchase(id) {
        try {
            const purchase = await this.Purchase.findByPk(id);
            if (!purchase) {
                throw new Error('Purchase not found');
            }

            if (purchase.status !== 'pending') {
                throw new Error('Purchase is not in pending state');
            }

            await db.MovimentacaoProduto.create({
                depositoId: purchase.depositoId,
                produtoId: purchase.productId,
                tipoMovimento: 'Entrada.Compra',
                quantidade: purchase.quantity,
                precoUnitario: purchase.unitCost,
                data: new Date()
            });

            await purchase.update({ status: 'completed' });
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
                offset: offset,
                include: [
                    { model: db.Supplier, as: 'fornecedor' },
                    { model: db.Quotation, as: 'cotacao' },
                    { model: db.User, as: 'comprador' },
                    { model: db.Product, as: 'produto' }
                ]
            });
            return purchases;
        } catch (error) {
            throw error;
        }
    }

    async findPurchaseById(id) {
        try {
            const purchase = await this.Purchase.findByPk(id, {
                include: [
                    { model: db.Supplier, as: 'fornecedor' },
                    { model: db.Quotation, as: 'cotacao' },
                    { model: db.User, as: 'comprador' },
                    { model: db.Product, as: 'produto' }
                ]
            });
            return purchase;
        } catch (error) {
            throw error;
        }
    }

    async cancelPurchase(id) {
        try {
            const updatedPurchase = await this.Purchase.update(
                { status: 'cancelled' },
                { where: { id: id } }
            );
            return updatedPurchase;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PurchaseService;
