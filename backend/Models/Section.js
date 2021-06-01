const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');


const Section = sequelize.define('section', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    as: 'sections',
    createdAt: false,
    updatedAt: false
});

const Moderator = sequelize.define('moderator', {}, {
    as: 'moderators',
    createdAt: false,
    updatedAt: false
})

User.belongsToMany(Section, { through: 'moderator' })
Section.belongsToMany(User, { through: 'moderator' })


module.exports = { Section, Moderator };