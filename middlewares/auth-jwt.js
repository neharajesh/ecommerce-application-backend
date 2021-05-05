const jwt = require("jsonwebtoken");
const config = require("../config/auth-config.js");

const { User } = require("../models/user-model")
const { Role } = require("../models/role-model")

const verifyToken = (req, res, next) => {
    try {
        let token = req.headers["x-access-token"]
        if(!token) {
            return res.status(403).json({success: false, message: "no token provided"})
        }
        jwt.verify(token, config.secret, () => {
            req.userId = decoded.id;
            next()
        })
    } catch (err) {
        res.status(400).json({success: false, message: "error occured while verifying token"})
    }
} 

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).exec();
        if(!user) {
            return res.status(500).json({success: false, message: "user does not exist"})
        }
        const userRole = await Role.find({_id: {$in: user.role}})
        if(userRole === "admin") {
            next();
        }
        return res.status(403).json({success: false, message: "admin role required"})
    } catch (err) {
        res.json(400).json({success: false, message: "error checking user", errMessage: err.message})
    }
}

const authJwt = { verifyToken, isAdmin }
module.exports = { authJwt };
