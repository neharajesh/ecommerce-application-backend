const mongoose = require("mongoose")
const { Schema } = mongoose

const CartSchema = new Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: [true, "User ID required"]
    },
    product_list: [{
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: [true, "Product ID required"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price_before_discount : {
            type: Number,
            required: true
        },
        total_discount: {
            type: Number,
            required: true
        }
    }],
    is_active: {
        type: Boolean,
        required: true
    }
})

const Cart = mongoose.model("Cart", CartSchema)

module.exports = { Cart }