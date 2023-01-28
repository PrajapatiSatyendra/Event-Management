const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    userName: {
        type: String,
        required: true
    },
    email: String,
    password: {
        type: String,
        required: true
    },
    mobile: Number,
    emailVerified: {
        type: Boolean,
        default: false
    },
    phoneNumberVerified: {
        type: Boolean,
        default: false
    },
    status: String
}, { timestamps: true }
)

module.exports = mongoose.model('loginadmins', userSchema)