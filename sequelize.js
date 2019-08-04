var sequelize = require('sequelize');

var userModel = require('./models/user.js');
var messageModel = require('./models/message.js');
var userDataModel = require('./models/userData.js');
var signInLogModel = require('./models/signInLog');
var privateMessageModel = require('./models/privateMessage');
var crypto = require('./utils/crypto.js');

const seq = new sequelize('pbdb', 'pbuser', 'pbpassword', {
    host: 'localhost',
    dialect: 'mysql',
    operatorAliases: 'false',

    dialectOptions: {
        port: 3306
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

});

const User = userModel(seq, sequelize);
const Message = messageModel(seq, sequelize);
const UserData = userDataModel(seq, sequelize);
const SignInLog = signInLogModel(seq, sequelize);
const PrivateMessage = privateMessageModel(seq, sequelize);

User.hasOne(UserData);
Message.belongsTo(User, {foreignKeyConstraint: true});
SignInLog.belongsTo(User, {foreignKeyConstraint: true});

const populate = (() => {
    seq.sync({force: true})
    .then( () => {
    
        var salt = crypto.generateSalt(16);
        var password = crypto.sha512('admin', salt);
        User.create({
            id: 1,
            login: 'admin',
            password: password.passwordHash,
            salt: salt
        });

        var salt = crypto.generateSalt(16);
        var password = crypto.sha512('moderator', salt);
        User.create({
            id: 2,
            login: 'moderator',
            password: password.passwordHash,
            salt: salt
        });

        UserData.create({
            userId: 1,
            name: 'Paweł',
            city: 'Gdynia'
        })

        UserData.create({
            userId: 2,
            name: 'Krzysiek',
            city: 'Gdańsk'
        })

        Message.create({
            text: 'sample message',
            date: new Date(),
            userId: 1
        })

        Message.create({
            text: 'another message',
            date: new Date(),
            userId: 1
        })

        Message.create({
            text: 'mod message',
            date: new Date(),
            userId: 2
        })
    
    });
})

module.exports = {
    User,
    Message,
    UserData,
    SignInLog,
    PrivateMessage,
    populate
}