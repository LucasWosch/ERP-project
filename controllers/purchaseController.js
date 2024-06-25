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
}

module.exports = PurchaseController;
