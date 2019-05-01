var express = require('express');
var router = express.Router();

var signup = require('../controllers/signup.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/signup', signup.signupGet);
router.post('/signup', signup.signupPost);

module.exports = router;