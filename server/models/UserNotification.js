const mongoose = require('mongoose');

let UserNotificationSchema = new mongoose.Schema({
    messageType: String,
    notificationUserId: String,
    otherUserId: String,
    scriptId: String,
});

mongoose.model('UserNotification', UserNotificationSchema);
