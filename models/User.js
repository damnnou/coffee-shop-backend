const { Schema, model } = require("mongoose");

const User = new Schema({
    username: { 
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    orders: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        },
    ]
},
    { timestamps: true },
)

module.exports = model('User', User)