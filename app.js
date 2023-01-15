const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://sadam:test1234@cluster0.gaothmf.mongodb.net/nodejs?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs')

app.use(morgan('dev'));
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.use('/blogs', blogRoutes)
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})