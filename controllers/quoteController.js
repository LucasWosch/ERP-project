// ./controllers/quoteController.js

class QuoteController {
    constructor(quoteService) {
        this.quoteService = quoteService;
    }

    createQuote = async (req, res) => {
        try {
            const quote = await this.quoteService.createQuote(req.body);
            res.status(201).json(quote);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findQuotesByProduct = async (req, res) => {
        try {
            const quotes = await this.quoteService.findQuotesByProduct(req.params.productId);
            res.status(200).json(quotes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = QuoteController;
