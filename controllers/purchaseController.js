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

    completePurchase = async (req, res) => {
        try {
            const purchase = await this.purchaseService.completePurchase(req.params.id);
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

    findPurchaseById = async (req, res) => {
        try {
            const purchase = await this.purchaseService.findPurchaseById(req.params.id);
            if (purchase) {
                res.status(200).json(purchase);
            } else {
                res.status(404).json({ error: 'Purchase not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    cancelPurchase = async (req, res) => {
        try {
            const updatedPurchase = await this.purchaseService.cancelPurchase(req.params.id);
            res.status(200).json(updatedPurchase);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = PurchaseController;
