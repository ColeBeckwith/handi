const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

router.get('/', (req, res) => {
	User.find({}, (err, users) => {
		if (err) {
			res.status(500).send(error);
		} else {
			res.status(200).json(users);
		}
	})
});

router.delete('/all', (req, res) => {
	User.find({}).remove().exec().then(function(resp) {
		res.json(resp);
	})
});


router.get('/:id', (req, res) => {
	User.findById(req.param.id, (err, user) => {
		if (err) {
			res.status(500).send(error);
		} else {
			res.status(200).json(user)
		}
	})
});


router.post('/', (req, res) => {
	let user = new User({
		age: req.body.age,
		name: req.body.name
		// username: req.body.username,
		// firstName: req.body.firstName,
		// lastName: req.body.lastName,
		// email: req.body.email,
		// password: req.body.password
	});

	user.save((error) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.status(201).json({
				message: 'User created successfully.'
			});
		}
	})
});

module.exports = router;