// ./controllers/fornecedorController.js

class FornecedorController {
    constructor(fornecedorService) {
        this.fornecedorService = fornecedorService;
    }

    createFornecedor = async (req, res) => {
        try {
            const fornecedor = await this.fornecedorService.createFornecedor(req.body);
            res.status(201).json(fornecedor);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    updateFornecedor = async (req, res) => {
        try {
            const updatedFornecedor = await this.fornecedorService.updateFornecedor(req.params.id, req.body);
            if (updatedFornecedor[0] > 0) {
                res.status(200).json({ message: 'Fornecedor updated successfully' });
            } else {
                res.status(404).json({ error: 'Fornecedor not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findAllFornecedores = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const fornecedores = await this.fornecedorService.findAllFornecedores(page, pageSize);
            res.status(200).json(fornecedores);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findFornecedorById = async (req, res) => {
        try {
            const fornecedor = await this.fornecedorService.findFornecedorById(req.params.id);
            if (fornecedor) {
                res.status(200).json(fornecedor);
            } else {
                res.status(404).json({ error: 'Fornecedor not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    deleteFornecedor = async (req, res) => {
        try {
            const deletedFornecedor = await this.fornecedorService.deleteFornecedor(req.params.id);
            if (deletedFornecedor) {
                res.status(200).json({ message: 'Fornecedor deleted successfully' });
            } else {
                res.status(404).json({ error: 'Fornecedor not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = FornecedorController;
