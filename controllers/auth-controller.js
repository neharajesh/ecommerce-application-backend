const config = require("../config/auth-config");

const { User } = require("../models/user-model")
const { Role } = require("../models/role-model")

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async(req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        const savedUser = await user.save();
        if(req.body.role) {
            const role = await Role.find({name: {$in: req.body.role}}, (err, roles) => {
                if(err) {
                    return res.status(500).json({success: false, message: "error occurred while finding roles", errMessage: err.message})
                }
                user.role = role.map(currentRole => currentRole._id)
                user.save();
                res.status(200).json({success: true, message: "user registered successfully", user: savedUser})
            })
        } else {
            const role = await Role.findOne({name: "buyer"}, (err, role) => {
                if(err) {
                    return res.status(500).json({success: false, message: "error occurred while adding role", errMessage: err.message})
                }
                user.role = [role._id];
                user.save();
                res.status(200).json({success: true, message: "user registered successfully", user: savedUser})
            } )
        }
        console.log(savedUser);
    } catch (err) {
        console.log("error occurred while signing up")
    }
}

exports.signin = async(req, res) => {
    try {
        const user = await (User.findOne({ userṉame: req.body.username })).populate('role').exec((err, user) => {
            if(err) {
                return res.status(500).json({success: false, message: "could not sign user in", errMessage: err.message})
            } 
            if(!user) {
                return res.status(404).send({success: false, message: "user not found"})
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );        

            if(!passwordIsValid) {
                return res.status(401).send({success: false, message: "invalid password", auth_token: null})
            }
            var token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 86400
            })
            var authorities = [];
            user.role.map(currentRole => authorities.push(currentRole.toUpperCase()))
            console.log(`Role ${user.role.name} has been added`)
            res.status(200).send({
                name: user.name,
                username: user.username,
                role: authorities,
                auth_token: token
            })
            console.log(user)
        })
    } catch (err) {
        console.log("Error occurred while processing signin", err.message)
    }
}