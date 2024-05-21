// ./controllers/requisitionController.js

class RequisitionController {
    constructor(requisitionService) {
        this.requisitionService = requisitionService;
    }

    createRequisition = async (req, res) => {
        try {
            const requisition = await this.requisitionService.createRequisition(req.body);
            res.status(201).json(requisition);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    cancelRequisition = async (req, res) => {
        try {
            const updatedRequisition = await this.requisitionService.cancelRequisition(req.params.id);
            res.status(200).json(updatedRequisition);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findAllRequisitions = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const requisitions = await this.requisitionService.findAllRequisitions(page, pageSize);
            res.status(200).json(requisitions);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findRequisitionById = async (req, res) => {
        try {
            const requisition = await this.requisitionService.findRequisitionById(req.params.id);
            if (requisition) {
                res.status(200).json(requisition);
            } else {
                res.status(404).json({ error: 'Requisition not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    fulfillRequisition = async (req, res) => {
        try {
            const requisition = await this.requisitionService.fulfillRequisition(req.params.id);
            res.status(200).json(requisition);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = RequisitionController;
