module.exports = (sequelize, type) => {
    return sequelize.define('signInLog', {
        id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: type.DATE
        },
    {
        rowFormat: 'DYNAMIC'
    })

}