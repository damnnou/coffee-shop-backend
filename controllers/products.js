const Product = require('../models/Product')

const createProduct = async (req, res) => {
    try {
        const { title, description, img, price } = req.query;
        
        const product = await Product.findOne({title});


        if (product) {
            return res.json({
                message: 'уже есть',
            })
        }

        const newProduct = new Product({
            title,
            description,
            img,
            price,
        })

        await newProduct.save();

        res.json({
            newProduct,
            message: 'Продукт создан!',
        })

    } catch (error) {
        res.json({ message: error })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({
            products
        })
    } catch(error) {
        res.json({
            error
        })
    }
}

module.exports = { createProduct, getAllProducts };