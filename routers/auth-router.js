const { checkDuplicateUsername, checkRolesExist } = require("../middlewares/verify-signup");
const config = require("../config/auth-config");
const { User } = require("../models/user-model")
const { Role } = require("../models/role-model")
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const express = require("express")
const router = express()

router.route("/signup")
.post(async (req, res) => {
  try {
    const user = req.body
    const newUser = new User({ name: user.name, username: user.username, password: bcrypt.hashSync(req.body.password, 8)});
    const doesUserExist = await User.findOne({username: newUser.username})
    if(doesUserExist) {
      console.log("username exists")
      return res.json({ success: false, message: "Username already in use, try another"})
    }
    const savedUser = await newUser.save();
    if(newUser.role) {
        const role = await Role.find({name: {$in: newUser.role}}, (err, roles) => {
            if(err) {
                return res.status(500).json({success: false, message: "error occurred while finding roles", errMessage: err.message})
            }
            newUser.role = role.map(currentRole => currentRole._id)
            newUser.save();
            res.status(200).json({success: true, message: "user registered successfully", user: savedUser})
        })
    } else {
        const role = await Role.findOne({name: "buyer"}, (err, role) => {
            if(err) {
                return res.status(500).json({success: false, message: "error occurred while adding role", errMessage: err.message})
            }
            newUser.role = [role._id];
            console.log(user.role)
            newUser.save();
            res.status(200).json({success: true, message: "user registered successfully", user: savedUser})
        } )
    }
    console.log(savedUser);
  } catch (err) {
      console.log("error occurred while signing up")
  }
})


router.route("/signin")
.post(async (req, res) => {
  try {
      const user = await User.findOne({username: req.body.username})
      if(!user) {
          return res.status(200).json({success: false, message: "User not found"})
      }

      const role = await Role.findOne({_id: user.role})        
      if(!role) {
          return res.status(200).json({success: false, message: "Role not found"})
      }
      
      const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
      );        

      if(!passwordIsValid) {
          return res.status(200).json({success: false, message: "Invalid password", auth_token: null})
      }
      var token = jwt.sign({id: user._id}, config.secret, {
          expiresIn: 86400
      })
      var authorities = role.name.toUpperCase();
      console.log(`Role ${role.name} has been added`)
      res.status(200).json({
          name: user.name,
          username: user.username,
          role: authorities,
          auth_token: token
      })
      console.log(user)
  } catch (err) {
      console.log("Error occurred while processing signin", err.message)
  }
})

module.exports = router