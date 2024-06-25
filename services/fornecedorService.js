// ./services/fornecedorService.js

const db = require('../models'); // Ajuste o caminho conforme necessário

class FornecedorService {
    constructor(fornecedorModel) {
        this.Fornecedor = fornecedorModel;
    }
    
    async createFornecedor(fornecedorData) {
        try {
            const fornecedor = await this.Fornecedor.create(fornecedorData);
            return fornecedor;
        } catch (error) {
            throw error;
        }
    }

    async updateFornecedor(id, fornecedorData) {
        try {
            const updatedFornecedor = await this.Fornecedor.update(fornecedorData, {
                where: { id: id }
            });
            return updatedFornecedor;
        } catch (error) {
            throw error;
        }
    }

    async findAllFornecedores(page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const fornecedores = await this.Fornecedor.findAndCountAll({
                limit: pageSize,
                offset: offset
            });
            return fornecedores;
        } catch (error) {
            throw error;
        }
    }

    async findFornecedorById(id) {
        try {
            const fornecedor = await this.Fornecedor.findByPk(id);
            return fornecedor;
        } catch (error) {
            throw error;
        }
    }

    async deleteFornecedor(id) {
        try {
            const deletedFornecedor = await this.Fornecedor.destroy({
                where: { id: id }
            });
            return deletedFornecedor;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = FornecedorService;
