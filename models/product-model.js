const mongoose = require("mongoose")
const { Schema } = mongoose

require("mongoose-type-url")

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product Name required"]
    },
    image: {
        type: mongoose.SchemaTypes.Url,
        require: [true, "Image required"]
    },
    material: {
        type: String,
        required: [true, "Material Type required"]
    },
    brand: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        required: [true, "inStock required"]
    },
    fastDelivery: {
        type: Boolean,
        required: [true, "fastDelivery required"]
    },
    description: {
        type: String,
        minLength: [50, "Minimum 50 characters required"],
        required: [true, "Description required"]
    },
    price: {
        type: Number,
        required: [true, "Price required"]
    },
    rating: {
        type: Number,
        required: [true, "Rating required"]
    },
    color: {
        type: String,
    },
    quantity: {
        type: Number,
        required: [true, "Quantity amount required"]
    },
    offers: [{
        type: mongoose.Types.ObjectId, 
        ref: "Offer"
    }]

}, {
    timestamps: true
})

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product }