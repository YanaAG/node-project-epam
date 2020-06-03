const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = model('User', userSchema);

module.exports = User;
