const mongoose = require('mongoose')

const LoginuserSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sign"
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true, })

module.exports = mongoose.model('login', LoginuserSchema)