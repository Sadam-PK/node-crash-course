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

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog 2',
        body: 'more about my new blog 2'
    });
    blog.save()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err);
        })
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err);
        })
})

app.get('/single-blog', (req, res) => {
    Blog.findById('63c30d7ec06fe9322e42f9ef')
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err);
        })
})

app.use(express.static('public'))
app.get('/', (req, res) => {

    const blogs = [
        { title: 'Hamza Finds Eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Asad Finds Stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to win games?', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ]

    res.render('index', { title: 'Home', blogs });
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