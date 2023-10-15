const { Schema, model } = require("mongoose");

const Product = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
    img: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
})

module.exports = model('Product', Product);