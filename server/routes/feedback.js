const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Feedback = mongoose.model('Feedback');
const FeedbackRequest = mongoose.model('FeedbackRequest');

const tokenVerification = require('../config/tokenverification');

const feedbackService = require('../services/feedback-service');

const creditsService = require('../services/credits-service');

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

router.get('/:feedbackId', (req, res, next) => {
    Feedback.findById(req.params.feedbackId, (err, feedback) => {
        if (err) {
            return res.status(500).send(err);
        }

        feedbackService.buildDetailedFeedback(feedback).then((resp) => {
            return res.status(200).json({feedback: resp})
        }, (err) => {
            return res.status(500).send(err);
        });
    });
});

router.put('/:feedbackId', (req, res, next) => {
   Feedback.findById(req.params['feedbackId'], (err, feedback) => {
       if (err) {
           return res.status(500).send(err);
       }

       feedback.notes = req.body.notes;
       feedback.scriptRating = req.body.scriptRating;
       feedback.save((err) => {
           if (err) {
               return res.status(500).send(err);
           }
           return res.status(200).send({status: 'Saved'});
       })
   });
});

router.post('/submit', (req, res, next) => {
   Feedback.findById(req.body['_id'], (err, feedback) => {
       if (err) {
           return res.status(500).send(err);
       }

       feedback.notes = req.body.notes;
       feedback.scriptRating = req.body.scriptRating;
       feedback.completed = true;
       feedback.completedOn = new Date().getTime();

       // TODO not quite finished.
       FeedbackRequest.findById(req.body.feedbackRequestId, (err, feedbackRequest) => {
           feedbackRequest.outstandingReviews--;
           feedbackRequest.finishedReviews++;

           creditsService.transferCredits(req.requestUser, null, feedbackRequest.creditsOffered).then((resp) => {
              return res.status(200).json({status: 'Saved'});
           }, (err) => {

           });
       });

       return res.status(200).json({status: 'Saved'})
   })
});

module.exports = router;
