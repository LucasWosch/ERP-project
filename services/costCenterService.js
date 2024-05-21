// ./services/costCenterService.js

const db = require('../models'); // Ajuste o caminho conforme necessário

class CostCenterService {
    constructor(costCenterModel) {
        this.CostCenter = costCenterModel;
    }
    
    async createCostCenter(costCenterData) {
        try {
            const costCenter = await this.CostCenter.create(costCenterData);
            return costCenter;
        } catch (error) {
            throw error;
        }
    }

    async updateCostCenter(id, costCenterData) {
        try {
            const updatedCostCenter = await this.CostCenter.update(costCenterData, {
                where: { id: id }
            });
            return updatedCostCenter;
        } catch (error) {
            throw error;
        }
    }

    async findAllCostCenters(page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const costCenters = await this.CostCenter.findAndCountAll({
                limit: pageSize,
                offset: offset,
                include: [{ model: db.Department, as: 'department' }]
            });
            return costCenters;
        } catch (error) {
            throw error;
        }
    }

    async findCostCenterById(id) {
        try {
            const costCenter = await this.CostCenter.findByPk(id, {
                include: [{ model: db.Department, as: 'department' }]
            });
            return costCenter;
        } catch (error) {
            throw error;
        }
    }

    async deleteCostCenter(id) {
        try {
            const result = await this.CostCenter.destroy({
                where: { id: id }
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CostCenterService;
