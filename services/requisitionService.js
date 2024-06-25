// ./services/requisitionService.js

const db = require('../models'); // Ajuste o caminho conforme necessário

class RequisitionService {
    constructor(requisitionModel, movimentacaoProdutoService, quoteService) {
        this.Requisition = requisitionModel;
        this.movimentacaoProdutoService = movimentacaoProdutoService;
        this.quoteService = quoteService;
    }

    async createRequisition(requisitionData) {
        const t = await db.sequelize.transaction();
        try {
            const { userId, productId, quantity, costCenterCode, depositoId } = requisitionData;

            const product = await db.Product.findByPk(productId);
            if (!product) {
                throw new Error('Product not found');
            }

            const entrada = await this.movimentacaoProdutoService.findLatestEntradaByProductId(productId);
            if (!entrada) {
                throw new Error(`Nenhuma movimentação de entrada encontrada para o produto com ID ${productId}`);
            }

            const currentStock = await this.movimentacaoProdutoService.calculateStock(productId, depositoId);

            if (currentStock >= quantity) {
                // Fulfill from stock
                await this.movimentacaoProdutoService.createMovimentacaoProduto({
                    produtoId: entrada.produtoId,
                    depositoId: depositoId, // Use the provided depot ID
                    tipoMovimento: 'Saida.Requisicao',
                    quantidade: quantity,
                    precoUnitario: entrada.precoUnitario, // Adjust as necessary
                    data: new Date()
                }, { transaction: t });

                const requisition = await this.Requisition.create({
                    userId,
                    productId,
                    quantity,
                    costCenterCode,
                    depositoId,
                    status: 'Fulfilled'
                }, { transaction: t });

                await t.commit();
                return requisition;
            } else {
                // Create pending requisition and start quote process
                const requisition = await this.Requisition.create({
                    userId,
                    productId,
                    quantity,
                    costCenterCode,
                    depositoId,
                    status: 'Pending'
                }, { transaction: t });

                // Initiate quote process
                await this.quoteService.createQuoteProcess(productId, requisition.id);

                await t.commit();
                return requisition;
            }
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async cancelRequisition(id) {
        try {
            const requisition = await this.Requisition.findByPk(id);
            if (!requisition) {
                throw new Error('Requisition not found');
            }

            if (requisition.status === 'Fulfilled') {
                throw new Error('Cannot cancel a fulfilled requisition');
            }

            requisition.status = 'Cancelled';
            await requisition.save();
            return requisition;
        } catch (error) {
            throw error;
        }
    }

    async getAllRequisitions(page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const requisitions = await this.Requisition.findAndCountAll({
                limit: pageSize,
                offset,
                include: [
                    { model: db.User, as: 'user' ,
                        attributes: { exclude: ['password'] } },
                    { model: db.Product, as: 'product' },
                    { model: db.CostCenter, as: 'costCenter' },
                    { model: db.Deposit, as: 'deposito' }
                ]
            });
            return requisitions;
        } catch (error) {
            throw error;
        }
    }

    async getRequisitionById(id) {
        try {
            const requisition = await this.Requisition.findByPk(id, {
                include: [
                    { model: db.User, as: 'user' ,
                        attributes: { exclude: ['password'] } },
                    { model: db.Product, as: 'product' },
                    { model: db.CostCenter, as: 'costCenter' },
                    { model: db.Deposit, as: 'deposito' }
                ]
            });
            return requisition;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = RequisitionService;
