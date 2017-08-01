const mongoose = require('mongoose');

let FeedbackSchema = new mongoose.Schema({
    scriptId: mongoose.Schema.Types.ObjectId,
    feedbackRequestId: mongoose.Schema.Types.ObjectId,
    receiverId: mongoose.Schema.Types.ObjectId,
    giverId: mongoose.Schema.Types.ObjectId,
    completed: Boolean,
    dueOn: Number,
    notes: String,
    scriptRating: Number,
    feedbackRating: Number
});

mongoose.model('Feedback', FeedbackSchema);
