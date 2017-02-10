const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('User');

const jwt = require('express-jwt');

const auth = jwt({secret: process.env.SECRET, userProperty: 'payload'});

const passport = require('passport');

router.get('/', (req, res) => {
	User.find({}, (err, users) => {
		if (err) {
			res.status(500).send(error);
		} else {
			res.status(200).json(users);
		}
	})
});

router.delete('/all', (req, res) => {
	User.find({}).remove().exec().then(function(resp) {
		res.json(resp);
	})
});


router.get('/:id', (req, res) => {
	User.findById(req.param.id, (err, user) => {
		if (err) {
			res.status(500).send(error);
		} else {
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
           console.log('found user');
           return res.json({token: user.generateJWT() });
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
   user.save(function (err) {
       if (err) { return next(err) }

       return res.json({token: user.generateJWT() })
   })
});

module.exports = router;
