import {Script} from './script';

export interface Feedback {
    _id: String,
    scriptId: String,
    receiverId: String,
    giverId: String,
    completed: Boolean,
    dueOn: Number,
    notes: String,
    scriptRating: Number,
    feedbackRating: Number,
    script: Script,
    timeUntilDue: String
}
