const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true }
});

const uniqueValidator = require('mongoose-unique-validator');

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);