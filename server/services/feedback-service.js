const mongoose = require('mongoose');

const Feedback = mongoose.model('Feedback');
const FeedbackRequest = mongoose.model('FeedbackRequest');
const User = mongoose.model('User');
const Script = mongoose.model('Script');

const creditsService = require('./credits-service');

module.exports = {
    removeAllFeedbackDataForScript: removeAllFeedbackDataForScript,
    getSuggestedFeedbackRequests: getSuggestedFeedbackRequests,
    buildDetailedFeedbackRequest: buildDetailedFeedbackRequest
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
            for (let feedbackRequest of feedbackRequests) {
                if (feedbackRequest.userId.equals(user._id)) {
                    continue;
                }
                if (feedbackRequest.maxReviews <= (feedbackRequest.outstandingReviews + feedbackRequest.finishedReviews)) {
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
