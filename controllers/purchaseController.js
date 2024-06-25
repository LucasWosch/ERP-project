// ./controllers/purchaseController.js

class PurchaseController {
    constructor(purchaseService) {
        this.purchaseService = purchaseService;
    }

    createPurchase = async (req, res) => {
        try {
            const purchase = await this.purchaseService.createPurchase(req.body);
            res.status(201).json(purchase);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    closePurchase = async (req, res) => {
        try {
            const purchase = await this.purchaseService.closePurchase(req.params.id);
            res.status(200).json(purchase);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    cancelPurchase = async (req, res) => {
        try {
            const purchase = await this.purchaseService.cancelPurchase(req.params.id);
            res.status(200).json(purchase);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    
    findAllPurchases = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const purchases = await this.purchaseService.findAllPurchases(page, pageSize);
            res.status(200).json(purchases);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = PurchaseController;
