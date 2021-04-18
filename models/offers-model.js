const mongoose = require("mongoose")
const { Schema } = mongoose

const OfferSchema = new Schema({
    name: {
        type: String,
        required: [true, "Offer Name required"]
    },
    description: {
        type: String,
        required: [true, "Description required"]
    },
    discount: {
        type: Number,
        default: 0
    }, 
    valid_from: {
        type: Number,
        required: true
    },
    valid_to: {
        type: Number,
        required: true
    }
})

const Offer = mongoose.model("Offer", OfferSchema)

module.exports = { Offer }