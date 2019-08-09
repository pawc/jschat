var seq = require('../sequelize.js');
var sequelize = require('sequelize');

const conversationsGET = ((req, res, next) => {

    //TODO 

    res.render('conversations');
    
});

module.exports = {
    conversationsGET
}