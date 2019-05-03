module.exports = (sequelize, type) => {
    return sequelize.define('userData', {
        name: type.STRING,
        city: type.STRING
    })
}