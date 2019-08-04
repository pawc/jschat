var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sharedSession = require('express-socket.io-session');
var dateFormat = require('dateformat');
var seq = require('./sequelize.js');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var usersInChat = new Set([]);

server.listen(3000);

var crypto = require('./utils/crypto.js');

var session = require('express-session')({
	secret: crypto.generateSalt(16),
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 60000
	}
});

app.use(session);

io.use(sharedSession(session, {autoSave: true}));

io.on('connection', function(client){
    
    client.on('join', function(data){
		console.log('Client '+client.handshake.session.login+' logged in.');
		usersInChat.add(client.handshake.session.login);
		console.log('Users chatting: '+Array.from(usersInChat).join(' '));
		var o = new Object();
		o.message = client.handshake.session.login+' joined the chat.';
		o.users = Array.from(usersInChat).join(',');
		client.emit('user', o);
		client.broadcast.emit('user', o);
	});

	client.on('disconnect', function(data){
		console.log('Client '+client.handshake.session.login+' left.');
		usersInChat.delete(client.handshake.session.login);
		console.log('Users chatting: '+Array.from(usersInChat).join(' '));
		var o = new Object();
		o.message = client.handshake.session.login+' left the chat.';
		o.users = Array.from(usersInChat).join(',');
		client.broadcast.emit('user', o);
	})

	client.on('newMessage', (data) => {
		console.log('message from userId: '+client.handshake.session.userId);
		seq.BoardMessage.create({
			userId: client.handshake.session.userId,
			text: data.message,
			date: new Date()
		})
		data.date = dateFormat(new Date(), 'yyyy-mm-dd HH:MM');
		client.emit('newMessage', data);
    	client.broadcast.emit('newMessage', data);
	});

});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

seq.populate();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/public', express.static(__dirname + '/public/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/socket.io-client', express.static(__dirname + '/node_modules/socket.io-client/dist/'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;