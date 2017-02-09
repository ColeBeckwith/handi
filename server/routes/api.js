const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// const dbHost = 'mongodb://database/handyman-app';
const dbHost = 'mongodb://localhost:27017';

mongoose.connect(dbHost);

router.get('/', (req, res) => {
	res.send('api works');
});

module.exports = router;