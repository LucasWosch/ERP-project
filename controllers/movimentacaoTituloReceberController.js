// ./controllers/movimentacaoTituloReceberController.js

class MovimentacaoTituloReceberController {
    constructor(movimentacaoTituloReceberService) {
        this.movimentacaoTituloReceberService = movimentacaoTituloReceberService;
    }

    getAllMovimentacoesByTitulo = async (req, res) => {
        try {
            const movimentacoes = await this.movimentacaoTituloReceberService.getAllMovimentacoesByTitulo(req.params.idTitulo);
            res.status(200).json(movimentacoes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = MovimentacaoTituloReceberController;
