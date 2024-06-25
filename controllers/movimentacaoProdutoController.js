// ./controllers/movimentacaoProdutoController.js

class MovimentacaoProdutoController {
    constructor(movimentacaoProdutoService) {
        this.movimentacaoProdutoService = movimentacaoProdutoService;
    }

    createMovimentacaoProduto = async (req, res) => {
        try {
            const movimentacaoProduto = await this.movimentacaoProdutoService.createMovimentacaoProduto(req.body);
            res.status(201).json(movimentacaoProduto);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findAllMovimentacoesProduto = async (req, res) => {
        try {
            const movimentacoesProduto = await this.movimentacaoProdutoService.findAllMovimentacoesProduto();
            res.status(200).json(movimentacoesProduto);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findByProduto = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const movimentacoesProduto = await this.movimentacaoProdutoService.findByProduto(req.params.produtoId, page, pageSize);
            res.status(200).json(movimentacoesProduto);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findByDeposito = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const movimentacoesProduto = await this.movimentacaoProdutoService.findByDeposito(req.params.depositoId, page, pageSize);
            res.status(200).json(movimentacoesProduto);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findByData = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const intervaloData = {
                startDate: new Date(req.query.startDate),
                endDate: new Date(req.query.endDate)
            };
            const movimentacoesProduto = await this.movimentacaoProdutoService.findByData(intervaloData, page, pageSize);
            res.status(200).json(movimentacoesProduto);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getStock = async (req, res) => {
        try {
            const estoque = await this.movimentacaoProdutoService.calculateStock(req.params.produtoId);
            res.status(200).json({ produtoId: req.params.produtoId, estoque });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = MovimentacaoProdutoController;
