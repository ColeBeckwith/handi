const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Feedback = mongoose.model('Feedback');

const tokenVerification = require('../config/tokenverification');

router.use((req, res, next) => tokenVerification(req, res, next));

router.get('/by-script/:scriptId', (req, res, next) => {
    Feedback.find({scriptId: req.params.scriptId}, (err, feedback) => {
       if (err) {
           res.status(500).error(err);
       }
       res.status(200).json({feedback: feedback});
    });
});

module.exports = router;
