// ./controllers/tituloController.js

class TituloController {
    constructor(tituloService) {
        this.tituloService = tituloService;
    }

    createTitulo = async (req, res) => {
        try {
            const titulo = await this.tituloService.createTitulo(req.body);
            res.status(201).json(titulo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getAllTitulos = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const titulos = await this.tituloService.getAllTitulos(page, pageSize);
            res.status(200).json(titulos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getTituloById = async (req, res) => {
        try {
            const titulo = await this.tituloService.getTituloById(req.params.id);
            if (titulo) {
                res.status(200).json(titulo);
            } else {
                res.status(404).json({ error: 'Titulo not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = TituloController;
