// ./controllers/requisitionController.js

class RequisitionController {
    constructor(requisitionService, movimentacaoProdutoService, quoteService) {
        this.requisitionService = requisitionService;
        this.movimentacaoProdutoService = movimentacaoProdutoService;
        this.quoteService = quoteService;
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
            const requisition = await this.requisitionService.cancelRequisition(req.params.id);
            res.status(200).json(requisition);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getAllRequisitions = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const requisitions = await this.requisitionService.getAllRequisitions(page, pageSize);
            res.status(200).json(requisitions);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getRequisitionById = async (req, res) => {
        try {
            const requisition = await this.requisitionService.getRequisitionById(req.params.id);
            if (requisition) {
                res.status(200).json(requisition);
            } else {
                res.status(404).json({ error: 'Requisition not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = RequisitionController;
