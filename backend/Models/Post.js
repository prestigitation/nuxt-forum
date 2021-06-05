const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');
const { Section } = require('./Section')
const Post = sequelize.define('post', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    pinned: { // закреплен ли пост в секции
        type: DataTypes.BOOLEAN,
        default: false
    }
})

Post.belongsTo(User)
User.hasOne(Post)
Post.belongsTo(Section)

module.exports = Post