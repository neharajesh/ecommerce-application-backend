const mongoose = require("mongoose")
const { Schema } = mongoose

const WishlistSchema = new Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    product_list: [{
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true
        }
    }]
})

const Wishlist = mongoose.model("Wishlist", WishlistSchema)

module.exports = { Wishlist }