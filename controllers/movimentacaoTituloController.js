// ./controllers/movimentacaoTituloController.js

class MovimentacaoTituloController {
    constructor(movimentacaoTituloService) {
        this.movimentacaoTituloService = movimentacaoTituloService;
    }

    createMovimentacaoTitulo = async (req, res) => {
        try {
            const movimentacaoTitulo = await this.movimentacaoTituloService.createMovimentacaoTitulo(req.body);
            res.status(201).json(movimentacaoTitulo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getAllMovimentacoesByTitulo = async (req, res) => {
        try {
            const movimentacoes = await this.movimentacaoTituloService.getAllMovimentacoesByTitulo(req.params.idTitulo);
            res.status(200).json(movimentacoes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = MovimentacaoTituloController;
