var sequelize = require('sequelize');

var userModel = require('./models/user.js');
var messageModel = require('./models/message.js');
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

Message.belongsTo(User, {foreignKeyConstraint: true});
//User.hasMany(Message, {foreignKeyConstraint: true});

const populate = (() => {
    seq.sync({force: true})
    .then( () => {
    
        var salt = crypto.generateSalt(16);
        var password = crypto.sha512('admin', salt);
        User.create({
            login: 'admin',
            password: password.passwordHash,
            salt: salt
        });

        Message.create({
            text: 'sample message',
            date: new Date(),
            userId: 1
        })
    
    });
})

module.exports = {
    User,
    Message,
    populate
}