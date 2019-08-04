module.exports = (sequelize, type) => {
    return sequelize.define('privateMessage', {
        id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sender: {
            type: type.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        recipient: {
            type: type.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        date: type.DATE,
        text: type.STRING
    },
    {
        rowFormat: 'DYNAMIC'
    })
}