const { Router } = require("express");
const { createProduct, getAllProducts } = require('../controllers/products')

const router = new Router();

// Create product
router.post('/products', createProduct);

router.get('/products', getAllProducts);

module.exports = router;