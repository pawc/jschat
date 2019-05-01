var express = require('express');
var router = express.Router();
//var createError = require('http-errors');

var signup = require('../controllers/signup.js');
var signin = require('../controllers/signin.js');
var signout = require('../controllers/signout');

router.get('/', checkLoggedIn, function(req, res, next) {
	res.render('index', { 
		   title: 'Express',
		   login: req.session.login
	});
});

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