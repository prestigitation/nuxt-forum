const express = require('express')
const app = express()
const cors = require('cors')
const UserController = require('./Controllers/UserController')
const SectionController = require('./Controllers/SectionController')
const PostController = require('./Controllers/PostController')
const formidable = require('express-formidable')
const path = require('path')

app.use(formidable())
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../frontend/static')))
app.use(express.urlencoded({ extended: true }))

// ------------------------------GET -----------------------------------------------------
app.get('/api/sections', async(req, res) => {
    await SectionController.getAll().then((sections) => res.json(sections)).catch(() => res.sendStatus(404))
})
app.get('/moderator/sections/:id', async(req, res) => {
    await SectionController.getModeratedSections(req.params.id).then(sections => res.json(sections)).catch(() => res.sendStatus(404))
})
app.get('/api/sections/:slug/:postId', async(req, res) => {
    await PostController.getSluggedPostById(req.params.postId).then(post => res.json(post)).catch(() => res.sendStatus(404))
})
app.get('/api/sections/:slug', async(req, res) => {
    await PostController.getAllBySlug(req.params.slug).then(posts => res.json(posts)).catch(() => res.sendStatus(404))
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
app.post('/api/posts', async(req, res) => {
    await PostController.createPost(req).then(() => { res.send('Пост был успешно добавлен.Вернуться на главную') }).catch(() => { res.send('Не удалось добавить пост. Проверьте текстовые формы, а также избегайте дублирование.') })
})


app.listen(4000)