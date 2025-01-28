require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json()); // Make sure this is here!
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/posts', postRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/my-blog';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch((err) => console.error('MongoDB connection error:', err));

const Post = require('./models/Post');

// Routes
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Use the post routes
app.use('/api/posts', postRoutes);

// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
