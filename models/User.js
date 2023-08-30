const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
        //fly me  to the moon, let me play among the stars, in other words, please be true, in ther words, i love you
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;