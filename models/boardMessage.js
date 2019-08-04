module.exports = (sequelize, type) => {
    return sequelize.define('boardMessage', {
        id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: type.DATE,
        text: type.STRING
		},
    {
        rowFormat: 'DYNAMIC'
    })
}