var express = require('express');
var router = express.Router();

var users = require('../controllers/users');

router.get('/:login', checkLoggedIn, users.getUser);

function checkLoggedIn(req, res, next){
    if(req.session.loggedIn){
    	next();
    } else {
		res.redirect('/signin');
    }
}

module.exports = router;