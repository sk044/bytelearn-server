const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    categories : {
        type : String,
    },
    content : {
        type : String,
    },
    createdAt : { type: Date, required: true, default: Date.now }
})

const postdb = mongoose.model('postsdb', schema);

module.exports = postdb;