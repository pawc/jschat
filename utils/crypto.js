var crypto = require('crypto');

var generateSalt = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length);   /** return required number of characters */
};

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

function saltHashPassword(userpassword) {
    var salt = generateSalt(16); /** Gives us salt of length 16 */
    return sha512(userpassword, salt);
}

module.exports = {
    generateSalt,
    saltHashPassword
}