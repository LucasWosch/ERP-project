// ./services/productService.js

const db = require('../models'); // Ajuste o caminho conforme necessário

class ProductService {
    constructor(productModel) {
        this.Product = productModel;
    }
    
    async createProduct(productData) {
        try {
            const product = await this.Product.create(productData);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, productData) {
        try {
            const updatedProduct = await this.Product.update(productData, {
                where: { id: id }
            });
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    async findAllProducts(page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const products = await this.Product.findAndCountAll({
                limit: pageSize,
                offset: offset
            });
            return products;
        } catch (error) {
            throw error;
        }
    }

    async findProductById(id) {
        try {
            const product = await this.Product.findByPk(id);
            return product;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductService;
