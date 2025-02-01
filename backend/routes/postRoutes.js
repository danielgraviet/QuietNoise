const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { auth } = require('./authRoutes');


router.get('/featured', async (req, res) => {
    try {
        console.log('Fetching featured article');
        // You can modify this query based on your criteria for featuring an article
        // For example, you might have a 'featured' boolean field in your schema
        const featuredArticle = await Post.findOne({ featured: true })
            // Or get the most recent article
            // .sort({ createdAt: -1 })
            .limit(1);

        if (!featuredArticle) {
            return res.status(404).json({ message: 'No featured article found' });
        }

        res.json(featuredArticle);
    } catch (error) {
        console.error('Error fetching featured article:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new post
router.post('/', auth, async (req, res) => {
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

// Get featured article


module.exports = router;
