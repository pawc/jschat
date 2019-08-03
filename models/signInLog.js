module.exports = (sequelize, type) => {
    return sequelize.define('signInLog', {
        id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: type.DATE,
        userId: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        }
        },
    {
        rowFormat: 'DYNAMIC'
    })

}