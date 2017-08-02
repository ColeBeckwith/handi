const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Feedback = mongoose.model('Feedback');

const tokenVerification = require('../config/tokenverification');

const feedbackService = require('../services/feedback-service');

router.use((req, res, next) => tokenVerification(req, res, next));

router.get('/by-script/:scriptId', (req, res, next) => {
    Feedback.find({scriptId: req.params.scriptId}, (err, feedback) => {
       if (err) {
           res.status(500).error(err);
       }
       res.status(200).json({feedback: feedback});
    });
});

router.get('/by-user/:userId', (req, res, next) => {
    Feedback.find({ giverId: req.params.userId }, (err, feedbacks) => {
        if (err) {
            res.status(500).send(err);
        }
        let feedbackPromises = [];
        let detailedFeedbacks = [];
        feedbacks.forEach((feedback) => {
            feedbackPromises.push(new Promise((resolve, reject) => {
                feedbackService.buildDetailedFeedback(feedback).then((detailedFeedback) => {
                    detailedFeedbacks.push(detailedFeedback);
                    resolve();
                }, (err) => {
                    reject();
                });
            }));
        });
        Promise.all(feedbackPromises).then((resp) => {
            res.status(200).json({feedback: detailedFeedbacks });
        }, (err) => {
           res.status(500).send('Unable to build detailed feedback');
        });
    });
});

module.exports = router;
