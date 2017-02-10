const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
    email: {type: String, lowercase: true},
	firstName: String,
	lastName: String,
	hash: String,
    salt: String
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(24).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 128, 'sha256').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    return this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 128, 'sha256').toString('hex');
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 5);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        exp: parseInt(exp.getTime() / 1000)
    }, process.env.SECRET)
};

mongoose.model('User', UserSchema);
