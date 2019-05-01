var express = require('express');
var router = express.Router();

var signup = require('../controllers/signup.js');
var signin = require('../controllers/signin.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/signup', signup.signupGet);
router.post('/signup', signup.signupPost);

router.get('/signin', signin.signinGet);
router.post('/signin', signin.signinPost);

module.exports = router;