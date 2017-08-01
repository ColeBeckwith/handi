const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

const jwt = require('express-jwt');

const auth = jwt({secret: process.env.SECRET, userProperty: 'payload'});

const passport = require('passport');

router.get('/user-by-id/:id', (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) {
            res.status(500).send(error);
        } else {
		    delete user.salt;
		    delete user.hash;
		    delete user.email;
			res.status(200).json(user)
		}
	})
});

router.post('/login', (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({message: 'Please fill out all fields.'})
    }

    passport.authenticate('local', (err, user, info) => {
       if (err) { return next(err) }

       if (user) {
           return res.json({token: user.generateJWT()});
       } else {
           return res.status(401).json(info);
       }
    })(req, res, next);

});

router.post('/register', (req, res, next) => {
   if (!req.body.email || !req.body.password || !req.body.firstName) {
       return res.status(400).json({message: 'Please fill out all fields'});
   }

   User.findOne({email: req.body.email}, (err, user) => {
      if (user) {
          return res.status(400).json({message: 'An account is already registered with that e-mail.'});
      }
   });

   let user = new User();
   user.email = req.body.email;
   user.firstName = req.body.firstName;
   user.setPassword(req.body.password);
   user.availableCredits = 5;
   user.save(function (err) {
       if (err) { return next(err) }

       return res.json({token: user.generateJWT()})
   })
});

module.exports = router;
