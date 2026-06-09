const mongoose = require('mongoose')

const SignuserSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        min : 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true, })

module.exports = mongoose.model('sign', SignuserSchema)