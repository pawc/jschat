module.exports = (sequelize, type) => {
    return sequelize.define('boardMessage', {
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