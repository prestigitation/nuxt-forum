const { Section, Moderator } = require('../Models/Section')
const User = require('../Models/User')
const slug = require('slug')
const { Op } = require('sequelize');


class SectionController {
    createSection({ name, userId }) {
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
    getAll() {
        return new Promise(async(resolve, reject) => {
            let result = new Array()
            await Moderator.findAll().then(async moders => {
                for (let i = 0; i < moders.length; i++) {
                    let user = await User.findOne({
                        where: {
                            id: moders[i].userId
                        },
                        attributes: {
                            exclude: ['password', 'email,roleId'] // убираем потенциально опасные и ненужные поля при выдаче
                        }
                    })
                    let section = await Section.findOne({
                        where: {
                            id: moders[i].sectionId
                        }
                    })
                    result.push({ user, section }) // собираем вместе полученные данные и записываем в массив result
                }
                try {
                    resolve(result)
                } catch (e) {
                    console.log(e)
                    reject(404)
                }
            })
        })
    }
    getModeratedSections(moderatorId) {
        return new Promise((resolve, reject) => {
            Moderator.findAll({
                where: {
                    userId: moderatorId
                }
            }).then(async moders => {
                let result = new Array()
                for (let i = 0; i < moders.length; i++) {
                    let section = await Section.findOne({
                        where: {
                            id: moders[i].sectionId
                        }
                    })
                    result.push(section)
                }
                try {
                    resolve(result)
                } catch (e) {
                    console.log(e)
                    reject(404)
                }
            })
        })
    }
}


module.exports = new SectionController()