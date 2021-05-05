const mongoose = require("mongoose")
const { Schema } = mongoose

const UserSchema = new Schema({
    name : {
        type: String,
        required: true
    }, 
    username: {
        type: String, 
        required: true,
        unique: [true, "Username has been taken, try another"]
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: "Role"
    },
    auth_token: {
        type: String
    }
})

const User = mongoose.model("User", UserSchema) 

module.exports = { User }