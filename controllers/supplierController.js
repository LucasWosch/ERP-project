// ./controllers/supplierController.js

class SupplierController {
    constructor(supplierService) {
        this.supplierService = supplierService;
    }

    createSupplier = async (req, res) => {
        try {
            const supplier = await this.supplierService.createSupplier(req.body);
            res.status(201).json(supplier);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    updateSupplier = async (req, res) => {
        try {
            const updatedSupplier = await this.supplierService.updateSupplier(req.params.id, req.body);
            if (updatedSupplier[0] > 0) {
                res.status(200).json({ message: 'Supplier updated successfully' });
            } else {
                res.status(404).json({ error: 'Supplier not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findAllSuppliers = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const suppliers = await this.supplierService.findAllSuppliers(page, pageSize);
            res.status(200).json(suppliers);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findSupplierById = async (req, res) => {
        try {
            const supplier = await this.supplierService.findSupplierById(req.params.id);
            if (supplier) {
                res.status(200).json(supplier);
            } else {
                res.status(404).json({ error: 'Supplier not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    deleteSupplier = async (req, res) => {
        try {
            const result = await this.supplierService.deleteSupplier(req.params.id);
            if (result) {
                res.status(200).json({ message: 'Supplier deleted successfully' });
            } else {
                res.status(404).json({ error: 'Supplier not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = SupplierController;
