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

    async updateCostCenter(code, costCenterData) {
        try {
            const updatedCostCenter = await this.CostCenter.update(costCenterData, {
                where: { code: code }
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
                offset: offset
            });
            return costCenters;
        } catch (error) {
            throw error;
        }
    }

    async findCostCenterByCode(code) {
        try {
            const costCenter = await this.CostCenter.findByPk(code);
            return costCenter;
        } catch (error) {
            throw error;
        }
    }

    async deleteCostCenter(code) {
        try {
            const deletedCostCenter = await this.CostCenter.destroy({
                where: { code: code }
            });
            return deletedCostCenter;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CostCenterService;
