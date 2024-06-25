// ./services/quoteService.js

const db = require('../models');

class QuoteService {
    constructor(quoteModel) {
        this.Quote = quoteModel;
    }

    async createQuote(quoteData) {
        try {
            const quote = await this.Quote.create(quoteData);
            return quote;
        } catch (error) {
            throw error;
        }
    }

    async findQuotesByProduct(productId) {
        try {
            const quotes = await this.Quote.findAll({
                where: { productId },
                include: [
                    { model: db.Fornecedor, as: 'supplier' },
                    { model: db.User, as: 'buyer' ,
                        attributes: { exclude: ['password'] }}, // Usando User para Buyer
                    { model: db.Product, as: 'product' }
                ]
            });
            return quotes;
        } catch (error) {
            throw error;
        }
    }

    async findBestQuoteByProduct(productId) {
        try {
            const quotes = await this.findQuotesByProduct(productId);
            if (quotes.length < 3) {
                throw new Error('At least 3 quotes are required to proceed with the purchase.');
            }
            return quotes.reduce((bestQuote, currentQuote) => {
                return currentQuote.price < bestQuote.price ? currentQuote : bestQuote;
            });
        } catch (error) {
            throw error;
        }
    }

    async createQuoteProcess(productId, requisitionId) {
        try {
            console.log(`Iniciando processo de cotação para o produto ${productId} e requisição ${requisitionId}`);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = QuoteService;
