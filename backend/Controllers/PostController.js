const slug = require('slug')
const Post = require('../Models/Post')
const fs = require('fs')
const path = require('path')
const User = require('../Models/User')
const Section = require('../Models/Section')
const SectionController = require('../Controllers/SectionController')
class PostController {
    async createPost(post) {
        return new Promise(async(resolve, reject) => {
            if (post.files.length > 5) { // если превысили лимит файлов
                reject()
            } else {
                let { userId, title, content } = post.fields
                let section = await SectionController.findBySlug(post.fields.section)
                Post.create({
                    userId,
                    title,
                    slug: slug(title),
                    content,
                    pinned: false,
                    sectionId: section.id
                }).then((newPost) => { // загрузка файлов, если таковые имеются
                    let files = post.files
                    console.log(files[1])
                    for (let i = 0; i < 5; i++) {
                        if (files[i]) {
                            let sectionPath = path.join(String(__dirname), '/../../frontend/static/sections/', String(section.slug)) // по умолчанию путь к файлам будет идти в фронтенд папку nuxt - static
                            if (!fs.existsSync(sectionPath)) {
                                fs.mkdirSync(sectionPath)
                            }
                            let postDirectory = path.join(sectionPath, '/', String(newPost.id), '/')
                            if (!fs.existsSync(postDirectory)) {
                                fs.mkdirSync(postDirectory)
                            }
                            let filePath = path.join(postDirectory, String(i) + '.jpeg')
                            fs.writeFileSync(filePath, fs.readFileSync(files[i].path)) // читаем буффер файла по заданному пути
                        }
                    }
                    resolve()
                }).catch(reject())
            }
        })
    }
    async getAllBySlug(slug) {
        return new Promise(async(resolve, reject) => {
            await SectionController.findBySlug(slug).then(section => {
                Post.findAll({
                    where: {
                        sectionId: section.id
                    },
                    include: User,
                }).then(posts => resolve(posts)).catch(err => reject(404))
            })
        })

    }
    async getSluggedPostById(postId) {
        return new Promise(async(resolve, reject) => {
            await Post.findOne({
                where: {
                    id: postId
                },
                include: {
                    all: true // all - загрузить все связанные модели для данной модели (в данном случае загрузить пользователя и секцию, в которой был оставлен пост)
                }
            }).then(post => resolve(post)).catch(err => reject(404))
        })
    }
}

module.exports = new PostController()