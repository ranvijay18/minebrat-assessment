const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const User = require('../models/user')

const Address = sequelize.define('address', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pincode: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    

})

User.hasOne(Address);
Address.belongsTo(User);

module.exports = Address;