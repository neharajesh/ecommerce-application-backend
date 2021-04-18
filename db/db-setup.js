const mongoose = require("mongoose");

const initializeDbConnection = async () => {
    try {
        const uri = "mongodb+srv://neharajesh:neharajesh@neharajesh-cluster.vblsg.mongodb.net/ecom-app";
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