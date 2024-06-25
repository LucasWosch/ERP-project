// ./controllers/costCenterController.js

class CostCenterController {
    constructor(costCenterService) {
        this.costCenterService = costCenterService;
    }

    createCostCenter = async (req, res) => {
        try {
            const costCenter = await this.costCenterService.createCostCenter(req.body);
            res.status(201).json(costCenter);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    updateCostCenter = async (req, res) => {
        try {
            const updatedCostCenter = await this.costCenterService.updateCostCenter(req.params.code, req.body);
            if (updatedCostCenter[0] > 0) {
                res.status(200).json({ message: 'Cost center updated successfully' });
            } else {
                res.status(404).json({ error: 'Cost center not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findAllCostCenters = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const costCenters = await this.costCenterService.findAllCostCenters(page, pageSize);
            res.status(200).json(costCenters);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findCostCenterByCode = async (req, res) => {
        try {
            const costCenter = await this.costCenterService.findCostCenterByCode(req.params.code);
            if (costCenter) {
                res.status(200).json(costCenter);
            } else {
                res.status(404).json({ error: 'Cost center not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    deleteCostCenter = async (req, res) => {
        try {
            const deletedCostCenter = await this.costCenterService.deleteCostCenter(req.params.code);
            if (deletedCostCenter) {
                res.status(200).json({ message: 'Cost center deleted successfully' });
            } else {
                res.status(404).json({ error: 'Cost center not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = CostCenterController;
