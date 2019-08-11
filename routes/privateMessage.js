var express = require('express');
var router = express.Router();

var privateMessages = require('../controllers/privateMessage');

router.get('/:userId', checkLoggedIn, privateMessages.getMessages);

function checkLoggedIn(req, res, next){
    if(req.session.loggedIn){
    	next();
    } else {
		res.redirect('/signin');
    }
}

module.exports = router;