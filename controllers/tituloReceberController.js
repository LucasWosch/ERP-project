// ./controllers/tituloReceberController.js

class TituloReceberController {
    constructor(tituloReceberService) {
        this.tituloReceberService = tituloReceberService;
    }

    getAllTitulosReceber = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const titulos = await this.tituloReceberService.getAllTitulosReceber(page, pageSize);
            res.status(200).json(titulos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getTituloReceberById = async (req, res) => {
        try {
            const tituloReceber = await this.tituloReceberService.getTituloReceberById(req.params.id);
            if (tituloReceber) {
                res.status(200).json(tituloReceber);
            } else {
                res.status(404).json({ error: 'TituloReceber not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    registerPayment = async (req, res) => {
        try {
            const tituloReceber = await this.tituloReceberService.registerPayment(req.params.id, req.body);
            res.status(200).json(tituloReceber);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = TituloReceberController;
