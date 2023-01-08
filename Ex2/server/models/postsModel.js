const mongoose = require('mongoose')

const postsModel = mongoose.Schema({
    user: String,
    imgName: String,
    text: String,
    avatar: String,
    timestamp: String
})

module.exports = mongoose.model('Ex2posts', postsModel)