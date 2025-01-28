const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.post('/', async (req, res) => {
    console.log('Received request body:', req.body); // Log entire request body
    try {
        const { content, author, post } = req.body;
        console.log('Attempting to create comment with:', { content, author, post });

        // Verify post ID format
        if (!post) {
            console.log('Post ID is missing');
            return res.status(400).json({ message: 'Post ID is required' });
        }

        const comment = new Comment({ content, author, post });
        console.log('Created comment object:', comment);

        const savedComment = await comment.save();
        console.log('Successfully saved comment:', savedComment);

        res.status(201).json(savedComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;