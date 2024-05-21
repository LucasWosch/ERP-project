// ./services/quotationService.js

const db = require('../models');

class QuotationService {
    constructor(quotationModel) {
        this.Quotation = quotationModel;
    }

    async createQuotation(quotationData) {
        try {
            const quotation = await this.Quotation.create(quotationData);
            return quotation;
        } catch (error) {
            throw error;
        }
    }

    async findAllQuotations(page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const quotations = await this.Quotation.findAndCountAll({
                limit: pageSize,
                offset: offset,
                include: [
                    { model: db.Product, as: 'produto' },
                    { model: db.Supplier, as: 'fornecedor' },
                    { model: db.User, as: 'comprador' }
                ]
            });
            return quotations;
        } catch (error) {
            throw error;
        }
    }

    async findQuotationById(id) {
        try {
            const quotation = await this.Quotation.findByPk(id, {
                include: [
                    { model: db.Product, as: 'produto' },
                    { model: db.Supplier, as: 'fornecedor' },
                    { model: db.User, as: 'comprador' }
                ]
            });
            return quotation;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = QuotationService;
