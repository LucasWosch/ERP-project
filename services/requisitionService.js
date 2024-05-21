// ./services/requisitionService.js

const db = require('../models');

class RequisitionService {
    constructor(requisitionModel) {
        this.Requisition = requisitionModel;
    }

    async createRequisition(requisitionData) {
        try {
            const requisition = await this.Requisition.create(requisitionData);
            return requisition;
        } catch (error) {
            throw error;
        }
    }

    async cancelRequisition(id) {
        try {
            const updatedRequisition = await this.Requisition.update(
                { status: 'cancelled' },
                { where: { id: id } }
            );
            return updatedRequisition;
        } catch (error) {
            throw error;
        }
    }

    async findAllRequisitions(page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const requisitions = await this.Requisition.findAndCountAll({
                limit: pageSize,
                offset: offset,
                include: [
                    { model: db.User, as: 'requerente' },
                    { model: db.Product, as: 'produto' },
                    { model: db.CostCenter, as: 'centroDeCusto' }
                ]
            });
            return requisitions;
        } catch (error) {
            throw error;
        }
    }

    async findRequisitionById(id) {
        try {
            const requisition = await this.Requisition.findByPk(id, {
                include: [
                    { model: db.User, as: 'requerente' },
                    { model: db.Product, as: 'produto' },
                    { model: db.CostCenter, as: 'centroDeCusto' }
                ]
            });
            return requisition;
        } catch (error) {
            throw error;
        }
    }

    async fulfillRequisition(id) {
        try {
            const requisition = await this.Requisition.findByPk(id);
            if (!requisition) {
                throw new Error('Requisition not found');
            }

            const product = await db.Product.findByPk(requisition.productId);
            if (product.stock >= requisition.quantity) {
                await product.update({ stock: product.stock - requisition.quantity });
                await requisition.update({ status: 'fulfilled' });
                return requisition;
            } else {
                throw new Error('Insufficient stock');
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = RequisitionService;
