// ./controllers/productController.js

class ProductController {
    constructor(productService) {
        this.productService = productService;
    }

    createProduct = async (req, res) => {
        try {
            const product = await this.productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    updateProduct = async (req, res) => {
        try {
            const updatedProduct = await this.productService.updateProduct(req.params.id, req.body);
            if (updatedProduct[0] > 0) {
                res.status(200).json({ message: 'Product updated successfully' });
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findAllProducts = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            const products = await this.productService.findAllProducts(page, pageSize);
            res.status(200).json(products);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    findProductById = async (req, res) => {
        try {
            const product = await this.productService.findProductById(req.params.id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = ProductController;
