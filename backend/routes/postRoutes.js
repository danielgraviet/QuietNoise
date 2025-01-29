const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create a new post
router.post('/', async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    console.log('Attempting to delete post with ID:', req.params.id);
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        console.log('Delete result:', deletedPost);

        if (!deletedPost) {
            console.log('Post not found');
            return res.status(404).json({ message: 'Post not found' });
        }

        await Comment.deleteMany({ post: req.params.id });

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
