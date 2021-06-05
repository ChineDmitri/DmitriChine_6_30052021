const mongoos = require('mongoose');

const userSchema = mongoos.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true }
});

const uniqueValidator = require('mongoose-unique-validator');

userSchema.plugin(uniqueValidator);

module.exports = mongoos.model('User', userSchema);