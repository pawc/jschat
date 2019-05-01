module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        login : {
            type: type.STRING,
            unique: true
        },
        password: type.STRING,
        salt: type.STRING
    })
}