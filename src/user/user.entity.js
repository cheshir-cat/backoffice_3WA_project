const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    nickname: { type: String, required: true },
    encryptedPassword: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

module.exports = { UserSchema, User };