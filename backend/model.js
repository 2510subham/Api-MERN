const { DataTypes } = require('sequelize');
const { sequelize } = require('./config');
const moment = require('moment');

const user = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        require: true
    },
    gender: {
        type: DataTypes.STRING,
        require: true
    },
    status: {
        type: DataTypes.STRING,
        require: true
    }
})
module.exports = { user }
