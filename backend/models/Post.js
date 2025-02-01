const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        default: '/images/default.jpg'
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Tech', 'Talks', 'Tips & Hacks']
    },
    readTime: {
        type: String,
        default: '10 mins read'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    featured: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Post', postSchema); 