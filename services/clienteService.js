// ./services/clienteService.js

const db = require('../models');

class ClienteService {
    constructor(clienteModel) {
        this.Cliente = clienteModel;
    }

    async createCliente(clienteData) {
        try {
            const cliente = await this.Cliente.create(clienteData);
            return cliente;
        } catch (error) {
            throw error;
        }
    }

    async getAllClientes(page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const clientes = await this.Cliente.findAndCountAll({
                limit: pageSize,
                offset
            });
            return clientes;
        } catch (error) {
            throw error;
        }
    }

    async getClienteById(id) {
        try {
            const cliente = await this.Cliente.findByPk(id);
            return cliente;
        } catch (error) {
            throw error;
        }
    }

    async updateCliente(id, clienteData) {
        try {
            const updatedCliente = await this.Cliente.update(clienteData, {
                where: { id }
            });
            return updatedCliente;
        } catch (error) {
            throw error;
        }
    }

    async deleteCliente(id) {
        try {
            const deletedCliente = await this.Cliente.destroy({
                where: { id }
            });
            return deletedCliente;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ClienteService;
