const { User } = require("../models/user-model")
const { Role } = require("../models/role-model")

// const ROLES = ["admin", "seller", "buyer"]

checkDuplicateUsername = async (req, res, next) => {
    try{ 
        const user = await User.findOne({username: req.body.username});
        if(user) {
            return res.status(400).json({ success: false, message: "Username already in use, try another"})
        }
        next()
    } catch (err) {
        res.status(500).json({success: false, message: "Could not fetch details", errMessage: err.message})
    }
}

checkRolesExist = async (req, res, next) => {
    try {
        const roleToCheck = req.body.role
        // const role = ROLES.filter(role => role !== roleToCheck)
        const role = await Role.findOne({name: roleToCheck})
        if(role === undefined) {
            return res.status(400).json({success: false, message: `${roleToCheck} does not exist`})
        }
        next()
    } catch (err) {
        res.json({success: false, message: "Error occurred while checking for roles", errMessage: err.message})
    }
} 

const verifySignup = { checkDuplicateUsername, checkRolesExist }
module.exports = { verifySignup };