// ./controllers/vendaController.js

class VendaController {
    constructor(vendaService) {
        this.vendaService = vendaService;
    }

    createVenda = async (req, res) => {
        try {
            const venda = await this.vendaService.createVenda(req.body);
            res.status(201).json(venda);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getAllVendas = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const vendas = await this.vendaService.getAllVendas(page, pageSize);
            res.status(200).json(vendas);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getVendaById = async (req, res) => {
        try {
            const venda = await this.vendaService.getVendaById(req.params.id);
            if (venda) {
                res.status(200).json(venda);
            } else {
                res.status(404).json({ error: 'Venda not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getVendasByData = async (req, res) => {
        try {
            const vendas = await this.vendaService.getVendasByData(req.params.dataVenda);
            res.status(200).json(vendas);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getVendasByNumeroNotaFiscal = async (req, res) => {
        try {
            const vendas = await this.vendaService.getVendasByNumeroNotaFiscal(req.params.numeroNotaFiscal);
            res.status(200).json(vendas);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = VendaController;
