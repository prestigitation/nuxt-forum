const express = require('express')
const app = express()
const cors = require('cors')
const UserController = require('./Controllers/UserController')


app.use(express.json())
app.use(cors())

app.post('/api/register', async(req, res) => {
    await UserController.register(req.body).then(user => { res.json(user) }).catch(() => { res.sendStatus(401) })
})
app.post('/api/login', async(req, res) => {
    await UserController.login(req.body).then(user => { res.json(user) }).catch(() => { res.sendStatus(401) })
})


app.listen(4000)