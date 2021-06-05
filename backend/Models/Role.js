const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');


const Role = sequelize.define('role', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    as: 'roles',
    createdAt: false,
    updatedAt: false
});


module.exports = Role;