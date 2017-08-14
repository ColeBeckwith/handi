const mongoose = require('mongoose');

const Feedback = mongoose.model('Feedback');
const FeedbackRequest = mongoose.model('FeedbackRequest');
const User = mongoose.model('User');
const Script = mongoose.model('Script');

const creditsService = require('./credits-service');

module.exports = {
    removeAllFeedbackDataForScript: removeAllFeedbackDataForScript,
    getSuggestedFeedbackRequests: getSuggestedFeedbackRequests,
    buildDetailedFeedbackRequest: buildDetailedFeedbackRequest,
    buildDetailedFeedback: buildDetailedFeedback,
    checkFeedbackRequestEligibility: checkFeedbackRequestEligibility,
    assignFeedbackRequestToUser: assignFeedbackRequestToUser,
};

function removeAllFeedbackDataForScript(script) {
    // Take all the requests associated with the script.
    FeedbackRequest.find({scriptId: script._id}, (err, feedbackRequests) => {
        feedbackRequests.forEach((feedbackRequest) => {
            // Find all the feedback associated with that request.
            Feedback.find({feedbackRequestId: feedbackRequest._id}, (err, feedbacks) => {
                feedbacks.forEach((feedback) => {
                    // If they are still outstanding, credit the user so they aren't halfway through a review when
                    // it's deleted.
                    if (!feedback.completed) {
                        User.findById(feedback.giverId, (err, user) => {
                            creditsService.transferCredits(user, null, feedbackRequest.creditsOffered);
                        });
                    }
                    // Now delete the feedback.
                    feedback.remove();
                });
            });
            // Now delete the request.
            feedbackRequest.remove();
        });
    });
}

function getSuggestedFeedbackRequests(user, startFrom, include, options) {
    return new Promise((resolve, reject) => {
        let fitCounter = 0;
        let suggestedFeedbackRequests = [];
        FeedbackRequest.find({}, (err, feedbackRequests) => {
            Feedback.find({giverId: user._id}, (err, feedbacks) => {
                let alreadyCoveredIds = [];
                feedbacks.forEach((feedback) => {
                    alreadyCoveredIds.push(feedback.scriptId.toString());
                });
                for (let feedbackRequest of feedbackRequests) {
                    if (feedbackRequest.userId.equals(user._id)) {
                        continue;
                    }
                    if (feedbackRequest.maxReviews <= (feedbackRequest.outstandingReviews + feedbackRequest.finishedReviews)) {
                        continue;
                    }
                    if (alreadyCoveredIds.indexOf(feedbackRequest.scriptId.toString()) !== -1) {
                        continue;
                    }

                    fitCounter++;
                    if (fitCounter > startFrom) {
                        suggestedFeedbackRequests.push(feedbackRequest);
                        if (suggestedFeedbackRequests.length >= include) {
                            break;
                        }
                    }
                }

                resolve(suggestedFeedbackRequests);
            });
        });
    });
}

function buildDetailedFeedbackRequest(feedbackRequest) {
    return new Promise((resolve, reject) => {
        Script.findById(feedbackRequest.scriptId, (err, script) => {
            script = script.toJSON();
            User.findById(script.userId, (err, user) => {
                script.author = user.getName();
                feedbackRequest.script = script;
                resolve(feedbackRequest);
            });
        });
    });
}

function buildDetailedFeedback(feedback) {
    return new Promise((resolve, reject) => {
        feedback = feedback.toJSON();
        Script.findById(feedback.scriptId, (err, script) => {
            if (err) {
                reject(err);
            }
            feedback.script = script;
            resolve(feedback);
        });
    });
}

function checkFeedbackRequestEligibility(user, feedbackRequestId) {
    return new Promise((resolve, reject) => {
        FeedbackRequest.findById(feedbackRequestId, (err, feedbackRequest) => {
            if (err || !feedbackRequest) {
                reject('Feedback request no longer exists.');
                return;
            }

            if (feedbackRequest.maxReviews <= (feedbackRequest.outstandingReviews + feedbackRequest.finishedReviews)) {
                reject('Feedback request has already been fulfilled.');
                return;
            }

            if (feedbackRequest.minimumReviewerRating >= user.reviewerRating) {
                reject('Feedback request requires a higher reviewer rating.');
                return;
            }

            Feedback.find({giverId: user._id}, (err, feedbacks) => {
                let reviewedScriptIds = [];

                feedbacks.forEach((feedback) => {
                    reviewedScriptIds.push(feedback._id);
                });

                if (reviewedScriptIds.indexOf(feedbackRequest.scriptId) !== -1) {
                    reject('User has already reviewed script');
                    return;
                }

                resolve();
            });
        })

    });
}

function assignFeedbackRequestToUser(user, feedbackRequestId) {
    return new Promise((resolve, reject) => {
        FeedbackRequest.findById(feedbackRequestId, (err, feedbackRequest) => {
            if (err || !feedbackRequest) {
                reject();
                return;
            }

            feedbackRequest.outstandingReviews++;

            feedbackRequest.save((err) => {
                if (err) {
                    reject();
                    return;
                }

                let newFeedback = new Feedback();
                newFeedback.feedbackRequestId = feedbackRequest._id;
                newFeedback.scriptId = feedbackRequest.scriptId;
                newFeedback.receiverId = feedbackRequest.userId;
                newFeedback.giverId = user._id;
                newFeedback.complete = false;
                // Current time plus the number of days in milliseconds.
                newFeedback.dueOn = new Date().getTime() + (feedbackRequest.daysAllowed * 86400000);
                newFeedback.notes = '';

                newFeedback.save((err) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve();
                })

            })
        });
    });
}
