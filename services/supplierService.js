// ./services/supplierService.js

const db = require('../models'); // Ajuste o caminho conforme necessário

class SupplierService {
    constructor(supplierModel) {
        this.Supplier = supplierModel;
    }
    
    async createSupplier(supplierData) {
        try {
            const supplier = await this.Supplier.create(supplierData);
            return supplier;
        } catch (error) {
            throw error;
        }
    }

    async updateSupplier(id, supplierData) {
        try {
            const updatedSupplier = await this.Supplier.update(supplierData, {
                where: { id: id }
            });
            return updatedSupplier;
        } catch (error) {
            throw error;
        }
    }

    async findAllSuppliers(page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const suppliers = await this.Supplier.findAndCountAll({
                limit: pageSize,
                offset: offset
            });
            return suppliers;
        } catch (error) {
            throw error;
        }
    }

    async findSupplierById(id) {
        try {
            const supplier = await this.Supplier.findByPk(id);
            return supplier;
        } catch (error) {
            throw error;
        }
    }

    async deleteSupplier(id) {
        try {
            const result = await this.Supplier.destroy({
                where: { id: id }
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SupplierService;
