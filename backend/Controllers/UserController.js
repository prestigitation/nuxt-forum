const User = require('../Models/User')
const bcrypt = require('bcryptjs')
class UserController {
    async register({ login, email, password, password_confirmation }) {
        return new Promise(function(resolve, reject) {
            if (password === password_confirmation && password && password_confirmation) { // если пароли указаны и они равны между собой
                User.create({ login, email, password: bcrypt.hashSync(password) })
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
}

module.exports = new UserController()