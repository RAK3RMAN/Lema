/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : LEMAConsole/models/userModel.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

//Schema for Mongoose
let userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String,
    },
    details: {
        first_name: String,
        last_name: String,
        console_theme: String,
    },
});

//Hash Passwords
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Check if Pass is Valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
