const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const creditsService = require('../services/credits-service');

const FeedbackRequest = mongoose.model('FeedbackRequest');
const User = mongoose.model('User');

const tokenVerification = require('../config/tokenverification');
const feedbackService = require('../services/feedback-service');

router.use((req, res, next) => tokenVerification(req, res, next));


router.get('/by-script/:scriptId', (req, res, next) => {
    FeedbackRequest.find({scriptId: req.params.scriptId}, (err, feedbackRequests) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json({feedbackRequests: feedbackRequests});
    });
});

router.post('/add', (req, res, next) => {
    let feedbackRequest = new FeedbackRequest();
    feedbackRequest.maxReviews = req.body.maxReviews || 0;
    feedbackRequest.finishedReviews = 0;
    feedbackRequest.outstandingReviews = 0;
    feedbackRequest.creditsOffered = req.body.creditsOffered || 0;
    feedbackRequest.daysAllowed = req.body.daysAllowed || 7;
    feedbackRequest.scriptId = req.body.scriptId;
    feedbackRequest.userId = req.requestUser;
    feedbackRequest.submitTime = new Date().getTime();
    feedbackRequest.minimumReviewerRating = req.body.minimumReviewerRating || 0;

    feedbackRequest.save((err) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json({feedbackRequest: feedbackRequest});
    })
});

router.put('/cancel', (req, res, next) => {
    FeedbackRequest.findById(req.body._id, (err, feedbackRequest) => {
        if (err || !feedbackRequest) {
            return res.status(400).send('Cannot find feedback request.')
        }
        if (!feedbackRequest.userId.equals(req.requestUser._id)) {
            return res.status(400).send('Request cannot be cancelled by this user.');
        }

        const cancellableReviews = feedbackRequest.maxReviews - (feedbackRequest.outstandingReviews + feedbackRequest.finishedReviews);
        feedbackRequest.maxReviews -= cancellableReviews;

        creditsService.transferCredits(req.requestUser, null, cancellableReviews * feedbackRequest.creditsOffered).then((resp) => {
            if (feedbackRequest.outstandingReviews === 0) {
                feedbackRequest.remove((err) => {
                    if (err) {
                        return res.status(500).send('Unable to remove feedback request');
                    }
                    return res.status(200).json({feedbackRequest: feedbackRequest});
                });
            } else {
                feedbackRequest.save((err) => {
                    if (err) {
                        return res.status(500).send('Unable to save feedback request.')
                    }
                    return res.status(200).json({feedbackRequest: feedbackRequest});
                });
            }
        }, (err) => {
            console.debug(err);
            return res.status(500).send('Unable to transfer credits.')
        });

    });
});

router.get('/suggested/start/:startFrom/include/:include/options/:options', (req, res, next) => {
    let startFrom = parseInt(req.params.startFrom);
    if (!startFrom) {
        startFrom = 0;
    }
    let include = parseInt(req.params.include);
    if (!include) {
        include = 10;
    }
    feedbackService.getSuggestedFeedbackRequests(req.requestUser, startFrom, include, JSON.parse(req.params.options)).then((feedbackRequests) => {
        let promises = [];
        let finalFeedbackRequests = [];
        feedbackRequests.forEach((feedbackRequest) => {
            feedbackRequest = feedbackRequest.toJSON();
            promises.push(new Promise((resolve, reject) => {
                feedbackService.buildDetailedFeedbackRequest(feedbackRequest).then((resp) => {
                    finalFeedbackRequests.push(resp);
                    resolve();
                });
            }));
        });
        Promise.all(promises).then(() => {
            return res.status(200).json({suggestedFeedbackRequests: finalFeedbackRequests});
        }, (err) => {
            return res.status(500).send(err);
        });
    }, (err) => {
        return res.status(500).send('Unable to get suggested scripts');
    });
});


module.exports = router;
