const mongoose = require('mongoose');

let FeedbackRequestSchema = new mongoose.Schema({
    maxReviews: Number,
    finishedReviews: Number,
    outstandingReviews: Number,
    creditsOffered: Number,
    daysAllowed: Number,
    scriptId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    submitTime: Number,
    minimumReviewerRating: Number
});

mongoose.model('FeedbackRequest', FeedbackRequestSchema);
