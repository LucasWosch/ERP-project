// ./controllers/clienteController.js

class ClienteController {
    constructor(clienteService) {
        this.clienteService = clienteService;
    }

    createCliente = async (req, res) => {
        try {
            const cliente = await this.clienteService.createCliente(req.body);
            res.status(201).json(cliente);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getAllClientes = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const clientes = await this.clienteService.getAllClientes(page, pageSize);
            res.status(200).json(clientes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getClienteById = async (req, res) => {
        try {
            const cliente = await this.clienteService.getClienteById(req.params.id);
            if (cliente) {
                res.status(200).json(cliente);
            } else {
                res.status(404).json({ error: 'Cliente not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    updateCliente = async (req, res) => {
        try {
            const updatedCliente = await this.clienteService.updateCliente(req.params.id, req.body);
            if (updatedCliente[0] > 0) {
                res.status(200).json({ message: 'Cliente updated successfully' });
            } else {
                res.status(404).json({ error: 'Cliente not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    deleteCliente = async (req, res) => {
        try {
            const deletedCliente = await this.clienteService.deleteCliente(req.params.id);
            if (deletedCliente) {
                res.status(200).json({ message: 'Cliente deleted successfully' });
            } else {
                res.status(404).json({ error: 'Cliente not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = ClienteController;
