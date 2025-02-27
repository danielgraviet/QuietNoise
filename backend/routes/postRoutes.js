const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { auth } = require('./authRoutes');


router.get('/featured', async (req, res) => {
    try {
        console.log('Fetching featured article');
        // this looks for the first post with featured set to true
        const featuredArticle = await Post.findOne({ featured: true })
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

// Search posts route - moved before more specific routes to avoid conflicts
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        console.log('Search query received:', q);

        if (!q || q.trim() === '') {
            return res.json([]);
        }

        // Log all posts available in the database to verify there's data to search
        const allPosts = await Post.find({}).limit(10);
        console.log('Total posts in DB:', allPosts.length);
        if (allPosts.length > 0) {
            console.log('Sample post titles:');
            allPosts.forEach(post => console.log('- ' + post.title));
        }

        // Make the search more lenient by treating each word as separate search term
        const searchTerms = q.split(' ').filter(term => term.trim() !== '');
        console.log('Search terms:', searchTerms);

        // Build a more lenient query that will match any of the words
        const searchQuery = {
            $or: searchTerms.flatMap(term => [
                { title: { $regex: term, $options: 'i' } },
                { content: { $regex: term, $options: 'i' } }
            ])
        };

        console.log('Search query:', JSON.stringify(searchQuery));
        const searchResults = await Post.find(searchQuery).limit(5);

        console.log('Found results:', searchResults.length);
        if (searchResults.length > 0) {
            console.log('Result titles:');
            searchResults.forEach(result => console.log('- ' + result.title));
        }

        res.json(searchResults);
    } catch (error) {
        console.error('Search error:', error);
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

// Route to create a test post for debugging search
router.get('/debug/create-test-post', async (req, res) => {
    try {
        const testPost = new Post({
            title: "Test Article for Search",
            content: "This is a test article to verify the search functionality is working correctly.",
            author: "Test Author",
            createdAt: new Date(),
            updatedAt: new Date(),
            featured: false
        });

        await testPost.save();
        console.log('Created test post:', testPost);

        res.json({
            message: 'Test post created successfully',
            post: testPost
        });
    } catch (error) {
        console.error('Error creating test post:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get featured article

module.exports = router;
