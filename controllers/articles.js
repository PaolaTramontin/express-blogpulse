let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /articles - create a new post
router.post('/', (req, res) => {
  db.article.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then((post) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/new - display form for creating new articles
router.get('/new', (req, res) => {
  db.author.findAll()
  .then((authors) => {
    res.render('articles/new', { authors: authors })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/:id - display a specific post and its author
router.get('/:id', (req, res) => {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author, db.comment],
  })
  .then((article) => {
    if (!article) throw Error()
    console.log(article.author)
    res.render('articles/show', { article: article })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})





////// NEW CODE:
//THIS IS THE POST ARTICLES. --New comment
router.post('/:id', (req, res) => {  // articles/1
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    articleId: req.body.articleId
     //we might have to add a red.params. articleId: req.body.authorId
  })
  .then((post) => {
   res.redirect('/')
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})



//SHOW ME ALL THE COMMENTS
router.get('/:id/comments', (req, res) => {  //artiles
  //let articleIndex = req.body.articleId
  db.comment.findAll({
    where: { articleId: req.params.id },
  })
  .then((comments) => {
    res.render('articles/comments', {comments: comments})
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})




//this route shows me 1 comment only
// router.get('/:id/comments', (req, res) => {
//   db.comment.findOne({
//     where: { articleId: req.params.id },
//   })
//   .then((comments) => {
//     res.render('articles/comments', {comments: comments})
//   })
//   .catch((error) => {
//     console.log(error)
//     res.status(400).render('main/404')
//   })
// })



















module.exports = router
