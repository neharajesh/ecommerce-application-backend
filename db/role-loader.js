const { Role } = require("../models/role-model")

const loadInitialData = async () => {
    try {
        await Role.estimatedDocumentCount((err, count) => {
            if(!err && count === 0) {
                const adminRole = new Role({
                    name: "admin"
                }).save();
                console.log("added user role");

                const sellerRole = new Role({
                    name: "seller"
                }).save();
                console.log("added seller role")

                const buyerRole = new Role({
                    name: "buyer"
                }).save()
                console.log("added buyer role")
            }
        })
    } catch (err) {
        console.log("error occurred while loading initial role data")
    }
}

module.exports = { loadInitialData }