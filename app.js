const express = require('express')
const morgan = require('morgan')

const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://sadam:<password>@cluster0.gaothmf.mongodb.net/?retryWrites=true&w=majority'

app.set('view engine', 'ejs')

app.listen(3000);
app.use(morgan('dev'));
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