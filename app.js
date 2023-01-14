const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://sadam:test1234@cluster0.gaothmf.mongodb.net/nodejs?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs')

app.use(morgan('dev'));

app.use(express.static('public'))
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/blogs', (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})


app.get('/about-us', (req, res) => {
    res.render('about')
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create New Blog' })
})

app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})