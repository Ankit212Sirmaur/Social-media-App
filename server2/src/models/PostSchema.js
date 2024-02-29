const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image: {
        publicId: String,
        url: String,
    },
    caption:{
        type: String,
        required: true,
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        }

    ]
})

module.exports = mongoose.model('Post', postSchema);