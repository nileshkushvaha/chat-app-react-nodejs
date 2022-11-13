const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 3,
        max: 20,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        max: 50
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: ""
    }
});
module.exports = mongoose.model('User', userSchema)