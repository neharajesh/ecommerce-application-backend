const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

const initializeDbConnection = async () => {
    try {
        const uri = MONGODB_URI;
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Database Connected.")
    } catch (err) {
        console.log("Database Connection Failed.")
    }    
}

module.exports = { initializeDbConnection };