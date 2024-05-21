// ./controllers/quotationController.js

class QuotationController {
    constructor(quotationService) {
        this.quotationService = quotationService;
    }

    createQuotation = async (req, res) => {
        try {
            const quotation = await this.quotationService.createQuotation(req.body);
            res.status(201).json(quotation);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findAllQuotations = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const quotations = await this.quotationService.findAllQuotations(page, pageSize);
            res.status(200).json(quotations);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findQuotationById = async (req, res) => {
        try {
            const quotation = await this.quotationService.findQuotationById(req.params.id);
            if (quotation) {
                res.status(200).json(quotation);
            } else {
                res.status(404).json({ error: 'Quotation not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = QuotationController;
