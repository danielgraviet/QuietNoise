require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json()); // Parses JSON request bodies
app.use(cors()); // Enables Cross-Origin Resource Sharing

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/my-blog';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
