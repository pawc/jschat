var sequelize = require('sequelize');

var userModel = require('./models/user.js')
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

const populate = (() => {
    seq.sync({force: true})
    .then( () => {
    
        var salt = crypto.generateSalt(16);
        var password = crypto.saltHashPassword('admin', salt);
        User.create({
            id: 1,
            login: 'admin',
            password: password.passwordHash,
            salt: salt
        })
    
    });
})


module.exports = {
    User,
    populate
}