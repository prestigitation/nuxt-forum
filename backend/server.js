const express = require('express')
const app = express()
const cors = require('cors')
const UserController = require('./Controllers/UserController')
const SectionController = require('./Controllers/SectionController')


app.use(express.json())
app.use(cors())

// ------------------------------GET -----------------------------------------------------
app.get('/api/sections', async(req, res) => {
    await SectionController.getAll().then((sections) => res.json(sections)).catch(() => res.sendStatus(404))
})
app.get('/moderator/sections/:id', async(req, res) => {
    await SectionController.getModeratedSections(req.params.id).then(sections => res.json(sections)).catch(() => res.sendStatus(404))
})



// -------------------------------POST-----------------------------------------------------
app.post('/api/register', async(req, res) => {
    await UserController.register(req.body).then(user => { res.json(user) }).catch(() => { res.sendStatus(401) })
})
app.post('/api/login', async(req, res) => {
    await UserController.login(req.body).then(user => { res.json(user) }).catch(() => { res.sendStatus(401) })
})
app.post('/api/filter', async(req, res) => {
    await UserController.filter(req.body).then(user => { res.json(user) }).catch(() => { res.sendStatus(404) })
})
app.post('/api/sections', async(req, res) => {
    await SectionController.createSection(req.body).then(() => res.sendStatus(200)).catch(() => { res.sendStatus(404) })
})


app.listen(4000)