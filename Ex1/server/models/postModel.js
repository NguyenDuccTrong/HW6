const mongoose = require('mongoose')
const postsModel = mongoose.Schema({
    caption: String,
    user: String,
    image: String
})

module.exports = mongoose.model('posts', postsModel)