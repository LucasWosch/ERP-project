// ./controllers/depositController.js

class DepositController {
    constructor(depositService) {
        this.depositService = depositService;

        // Bind methods to the class instance
        this.createDeposit = this.createDeposit.bind(this);
        this.updateDeposit = this.updateDeposit.bind(this);
        this.findAllDeposits = this.findAllDeposits.bind(this);
        this.findDepositById = this.findDepositById.bind(this);
        this.getPosicaoByDeposit = this.getPosicaoByDeposit.bind(this);
    }

    async createDeposit(req, res) {
        try {
            const deposit = await this.depositService.createDeposit(req.body);
            res.status(201).json(deposit);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateDeposit(req, res) {
        try {
            const updatedDeposit = await this.depositService.updateDeposit(req.params.id, req.body);
            if (updatedDeposit[0] > 0) {
                res.status(200).json({ message: 'Deposit updated successfully' });
            } else {
                res.status(404).json({ error: 'Deposit not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async findAllDeposits(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const deposits = await this.depositService.findAllDeposits(page, pageSize);
            res.status(200).json(deposits);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async findDepositById(req, res) {
        try {
            const deposit = await this.depositService.findDepositById(req.params.id);
            if (deposit) {
                res.status(200).json(deposit);
            } else {
                res.status(404).json({ error: 'Deposit not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getPosicaoByDeposit(req, res) {
        try {
            const posicao = await this.depositService.getPosicaoByDeposit(req.params.id);
            res.status(200).json(posicao);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = DepositController;
