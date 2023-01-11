const express = require('express')

const app = express();

app.set('view engine', 'ejs')

app.listen(3000);

app.get('/', (req, res)=>{
    // res.send('<p>Home Page</p>');
    res.render('index', {title:'Home'});
})


app.get('/about', (req, res)=>{
    res.render('about');
})


app.get('/about-us', (req, res)=>{
    res.render('about')
})

app.get('/blogs/create', (req, res)=>{
    res.render('create')
})

app.use((req, res)=>{
    res.status(404).render('404')
})