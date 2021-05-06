const { User } = require("../models/user-model")
const { Role } = require("../models/role-model")

checkDuplicateUsername = async (req, res, next) => {
    console.log("checking for duplicate username")
    try{ 
        const user = await User.findOne({username: req.body.username});
        console.log(user)
        if(user) {
            return res.status(400).json({ success: false, message: "Username already in use, try another"})
        }
        next()
    } catch (err) {
        return res.status(500).json({success: false, message: "Could not fetch details", errMessage: err.message})
    }
}

checkRolesExist = async (req, res, next) => {
    console.log("checking for duplicate roles")
    try {
        const roleToCheck = req.body.role
        const role = await Role.findOne({name: roleToCheck})
        if(role === undefined) {
            return res.status(400).json({success: false, message: `${roleToCheck} does not exist`})
        }
        next()
    } catch (err) {
        res.json({success: false, message: "Error occurred while checking for roles", errMessage: err.message})
    }
} 

module.exports = { checkDuplicateUsername, checkRolesExist };