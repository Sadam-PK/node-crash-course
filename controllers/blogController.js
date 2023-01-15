const Blog = require('../models/blog')
const blog_index = (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        })
}

const blog_details = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'blog details' })
        })
        .catch((err) => {
            console.log(err);
        })
}
const blog_create_get=(req, res)=>{
    res.render('create', { title: 'Create New Blog' })
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get, 
}