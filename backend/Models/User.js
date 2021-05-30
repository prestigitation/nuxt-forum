const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Role = require('./Role');


const User = sequelize.define('user', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 6
    }
}, {
    updatedAt: false
});
User.belongsTo(Role)
Role.hasOne(User)

module.exports = User;