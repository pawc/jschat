module.exports = (sequelize, type) => {
    return sequelize.define('message', {
        id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: type.STRING,
        date: type.DATE,
		},
    {
        rowFormat: 'DYNAMIC'
    })
}