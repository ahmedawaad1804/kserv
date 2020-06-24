const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const { saltRounds } = require('../commonConstant')

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    imageName: {
        type: String
    },
    phoneNumber: {
        type: Number,
        unique: true,
        required: true,
    },
    status: {
        type: String
    },
    OTP:{
        type:String,
    }
})
schema.statics.hashThePassword = function hashPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
}
schema.methods.isValid = function (password) {
    console.log("the  password is " + password)
    console.log("the hashed password is " + this.password)
    return bcrypt.compareSync(password, this.password);
}
module.exports = mongoose.model("Clients", schema)