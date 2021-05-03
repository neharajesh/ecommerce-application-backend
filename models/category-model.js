const mongoose = require("mongoose")
const { Schema } = mongoose

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Category Name required"]
    },
    description: {
        type: String,
        minLength: [50, "Description should have a minimum length of 50"],
        required: [true, "Description is required"]
    },
    product_list: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Add products to list"]
    }]
})

const Category = mongoose.model("Category", CategorySchema)

module.exports =  { Category }