const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
    transferCredits: transferCredits
};

function transferCredits(recipient, giver, numberOfCredits) {
    return new Promise((resolve, reject) => {
        let promises = [];

        if (giver) {
            promises.push(new Promise((resolve, reject) => {
                giver.availableCredits -= numberOfCredits;
                giver.save((err) => {
                    if (err) reject();
                    resolve();
                });
            }));
        }

        if (recipient) {
            promises.push(new Promise((resolve, reject) => {
                recipient.availableCredits += numberOfCredits;
                recipient.save((err) => {
                    if (err) reject();
                    resolve();
                });
            }));
        }

        Promise.all(promises).then(() => {
            resolve();
        }, (err) => {
            reject(err);
        });
    });

}
