// ./services/departmentService.js

const db = require('../models'); // Ajuste o caminho conforme necessário

class DepartmentService {
    constructor(departmentModel) {
        this.Department = departmentModel;
    }
    
    async createDepartment(departmentData) {
        try {
            const department = await this.Department.create(departmentData);
            return department;
        } catch (error) {
            throw error;
        }
    }

    async updateDepartment(id, departmentData) {
        try {
            const updatedDepartment = await this.Department.update(departmentData, {
                where: { id: id }
            });
            return updatedDepartment;
        } catch (error) {
            throw error;
        }
    }

    async findAllDepartments(page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const departments = await this.Department.findAndCountAll({
                limit: pageSize,
                offset: offset
            });
            return departments;
        } catch (error) {
            throw error;
        }
    }

    async findDepartmentById(id) {
        try {
            const department = await this.Department.findByPk(id);
            return department;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DepartmentService;
