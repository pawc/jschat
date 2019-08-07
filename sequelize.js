var sequelize = require('sequelize');

var userModel = require('./models/user.js');
var boardMessageModel = require('./models/boardMessage.js');
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
const BoardMessage = boardMessageModel(seq, sequelize);
const UserData = userDataModel(seq, sequelize);
const SignInLog = signInLogModel(seq, sequelize);
const PrivateMessage = privateMessageModel(seq, sequelize);

User.hasOne(UserData);
BoardMessage.belongsTo(User, {foreignKeyConstraint: true});
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

        BoardMessage.create({
            text: 'sample message',
            date: new Date(),
            userId: 1
        })

        BoardMessage.create({
            text: 'another message',
            date: new Date(),
            userId: 1
        })

        BoardMessage.create({
            text: 'mod message',
            date: new Date(),
            userId: 2
        })

        SignInLog.create({
            userId: 1,
            date: new Date()
        })

        SignInLog.create({
            userId: 2,
            date: new Date()
        })

        PrivateMessage.create({
            sender: 1,
            recipient: 2,
            date: new Date(),
            text: 'first test message from admin to moderator'
        })

        PrivateMessage.create({
            sender: 1,
            recipient: 2,
            date: new Date(),
            text: 'second test message from admin to moderator'
        })

        PrivateMessage.create({
            sender: 2,
            recipient: 1,
            date: new Date(),
            text: 'test message from moderator to admin'
        })
    
    });
})

const rawQuery = ((sql) => {
    seq.query(sql).then((results) => {
        return results;
    })
})

module.exports = {
    User,
    BoardMessage,
    UserData,
    SignInLog,
    PrivateMessage,
    populate,
    rawQuery
}