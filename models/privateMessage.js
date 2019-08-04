module.exports = (sequelize, type) => {
    return sequelize.define('privateMessage', {
        id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user1: {
            type: type.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        user2: {
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