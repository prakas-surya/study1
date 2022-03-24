const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        required:true,
        min:6,
        max:45
    },
    email: {
        type: String,
        required: true,
        min:6,
        max:233
    },
    password: {
        type: String,
        required: true,
        min:6,
        max:111
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Posts', PostSchema);