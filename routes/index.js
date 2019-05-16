var express = require('express');
var router = express.Router();
//var createError = require('http-errors');

var signup = require('../controllers/signup.js');
var signin = require('../controllers/signin.js');
var signout = require('../controllers/signout');
var message = require('../controllers/message.js');
var profile = require('../controllers/profile.js');
var users = require('../controllers/users');

router.get('/', checkLoggedIn, (req, res, next) => {
	res.render('index', {
		login: req.session.login
	});
})

router.get('/chat', checkLoggedIn, (req, res, next) => {
	res.render('chat', {
		login: req.session.login
	});
});

router.get('/getMessages', checkLoggedIn, message.getMessages);

router.get('/profile', checkLoggedIn, profile.getProfile);
router.post('/updateProfile', checkLoggedIn, profile.updateProfile);
router.post('/changePassword', checkLoggedIn, profile.changePassword);

router.get('/users', checkLoggedIn, users.getUsers);
router.get('/getAllUsers', checkLoggedIn, users.getAllUsers);

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