// ./controllers/departmentController.js

class DepartmentController {
    constructor(departmentService) {
        this.departmentService = departmentService;
    }

    createDepartment = async (req, res) => {
        try {
            const department = await this.departmentService.createDepartment(req.body);
            res.status(201).json(department);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    updateDepartment = async (req, res) => {
        try {
            const updatedDepartment = await this.departmentService.updateDepartment(req.params.id, req.body);
            if (updatedDepartment[0] > 0) {
                res.status(200).json({ message: 'Department updated successfully' });
            } else {
                res.status(404).json({ error: 'Department not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findAllDepartments = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const departments = await this.departmentService.findAllDepartments(page, pageSize);
            res.status(200).json(departments);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findDepartmentById = async (req, res) => {
        try {
            const department = await this.departmentService.findDepartmentById(req.params.id);
            if (department) {
                res.status(200).json(department);
            } else {
                res.status(404).json({ error: 'Department not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    deleteDepartment = async (req, res) => {
        try {
            const result = await this.departmentService.deleteDepartment(req.params.id);
            if (result) {
                res.status(200).json({ message: 'Department deleted successfully' });
            } else {
                res.status(404).json({ error: 'Department not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = DepartmentController;
