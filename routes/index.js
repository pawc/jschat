var express = require('express');
var router = express.Router();
//var createError = require('http-errors');

var signup = require('../controllers/signup.js');
var signin = require('../controllers/signin.js');
var signout = require('../controllers/signout');
var message = require('../controllers/message.js');
var profile = require('../controllers/profile.js');

router.get('/', checkLoggedIn, function(req, res, next) {
	res.render('board', {
		   login: req.session.login
	});
});

router.get('/getMessages', checkLoggedIn, message.getMessages);
router.post('/sendMessage', checkLoggedIn, message.sendMessage)

router.get('/profile', checkLoggedIn, profile.getProfile);
router.post('/updateProfile', checkLoggedIn, profile.updateProfile);

router.get('/signup', signup.signupGet);
router.post('/signup', signup.signupPost);

router.get('/signin', signin.signinGet);
router.post('/signin', signin.signinPost);

router.get('/signout', signout.signoutGet);

function checkLoggedIn(req, res, next){
    if(req.session.loggedIn){
    	next(); //If session exists, proceed to page
    } else {
		//next(createError(403));
		res.redirect('/signin');
    }
}

module.exports = router;