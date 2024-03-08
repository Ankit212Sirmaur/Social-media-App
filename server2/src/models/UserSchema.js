const mongoose = require('mongoose');

const userSchema = new  mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    bio:{
        type: String,
    },
    avatar:{
        publicId: String, 
        url: String,
    },
    followers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    followings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        }
    ]

}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);