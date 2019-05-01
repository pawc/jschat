const signoutGet = ((req, res, next) => {
    req.session.loggedIn = false;
    req.session.login = null;
    res.redirect('/signin');
});

module.exports = {
    signoutGet
}