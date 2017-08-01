/**
 * Created by mac on 7/28/17.
 */
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function(req, res, next) {
    let simpleUser = null;
    if (req.headers['authorization']) {
        simpleUser = jwt.verify(req.headers['authorization'].replace('Bearer ', ''), process.env.SECRET);
    }
    if (simpleUser) {
        User.findById(simpleUser._id, (err, user) => {
           req.requestUser = user;
           next();
        });
    } else {
        return res.status(403).json('Failed to Authenticate User');
    }
};
