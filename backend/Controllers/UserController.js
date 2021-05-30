const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const { Op } = require('sequelize');

class UserController {
    async register({ login, email, password, password_confirmation }) {
        return new Promise(function(resolve, reject) {
            if (password === password_confirmation && password && password_confirmation) { // если пароли указаны и они равны между собой
                User.create({ login, email, password: bcrypt.hashSync(password), roleId: 1 }) // по умолчанию присваиваем при регистрации роль 1 - пользователь
                    .then(user => { resolve(user); })
                    .catch(err => { reject(401); })
            } else reject(401)
        })
    }
    async login({ login, password }) {
        return new Promise((resolve, reject) => {
            User.findOne({ where: { login } }).then(user => {
                if (bcrypt.compareSync(password, user.password)) { // сравнение хэша паролей
                    resolve(user)
                } else reject(401)
            })
        })
    }
    async filter({ name }) {
        return new Promise((resolve, reject) => {
            User.findAll({
                where: {
                    login: {
                        [Op.like]: '%' + name + '%' // регулярное выражение для полнотекстового поиска
                    }
                }
            }).then(users => { resolve(users) }).catch(err => reject(404))
        })
    }
}

module.exports = new UserController()