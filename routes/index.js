var express = require('express');
var router = express.Router();
//var createError = require('http-errors');

var signup = require('../controllers/signup.js');
var signin = require('../controllers/signin.js');
var signout = require('../controllers/signout');
var boardMessage = require('../controllers/boardMessage.js');
var profile = require('../controllers/profile.js');
var users = require('../controllers/users');
var conversations = require('../controllers/conversations');
var privateMessage = require('../controllers/privateMessage');

router.get('/', (req, res, next) => {
	res.render('index', {
		login: req.session.login
	});
})

router.get('/board', checkLoggedIn, (req, res, next) => {
	res.render('board', {
		login: req.session.login
	});
});

router.get('/getBoardMessages', checkLoggedIn, boardMessage.getBoardMessages);

router.get('/profile', checkLoggedIn, profile.getProfile);
router.post('/updateProfile', checkLoggedIn, profile.updateProfile);
router.post('/changePassword', checkLoggedIn, profile.changePassword);

router.get('/users', checkLoggedIn, users.getUsers);
router.get('/getAllUsers', checkLoggedIn, users.getAllUsers);

router.get('/signup', signup.signupGet);
router.post('/signup', signup.signupPost);

router.get('/signin', signin.signinGet);
router.post('/signin', signin.signinPost);

router.get('/conversations', checkLoggedIn, conversations.renderView)
router.get('/getConversations', checkLoggedIn, conversations.getConversations);

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