var express = require('express');
var router = express.Router();

var privateMessages = require('../controllers/privateMessage');

router.get('/:userId', checkLoggedIn, privateMessages.getMessages);
router.get('/get/:userId', checkLoggedIn, privateMessages.getAllMessages);

function checkLoggedIn(req, res, next){
    if(req.session.loggedIn){
    	next();
    } else {
		res.redirect('/signin');
    }
}

module.exports = router;