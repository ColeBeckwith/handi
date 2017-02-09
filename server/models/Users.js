const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
	name: {type: String, unique: true},
	age: Number
	// username: {type: String, unique: true},
	// firstName: String,
	// lastName: String,
	// email: String,
	// password: String
});

mongoose.model('User', UserSchema);
