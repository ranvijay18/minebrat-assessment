const Sequelize = require('sequelize');

const sequelize = new Sequelize('ums','root',"2580@Ranvi", {
    dialect: 'mysql',
    host: "localhost"
  });

  module.exports = sequelize;