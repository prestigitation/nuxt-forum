const { Section, Moderator } = require('../Models/Section')
const User = require('../Models/User')
const slug = require('slug')
const { Op } = require('sequelize');


class SectionController {
    async createSection({ name, userId }) {
        console.log(name, userId)
        return new Promise((resolve, reject) => {
            User.findOne({ where: { id: userId } }).then(user => {
                Section.create({ name, slug: slug(name) }).then((section) => {
                    console.log(user.id, section.id)
                    Moderator.create({ userId: user.id, sectionId: section.id })
                    resolve(200)
                }).catch(err => reject(400))
            })
        })
    }
}


module.exports = new SectionController()