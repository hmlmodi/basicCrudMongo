// src/app.js
const express = require('express');
require('dotenv').config(); // Load environment variables
const connectDB = require('./config/config');
const bodyParser = require('body-parser'); // Import body-parser

// const crypto = require('crypto');

// // Generate a random string (JWT secret) of 64 characters (you can adjust the length)
// const jwtSecret = crypto.randomBytes(32).toString('hex');
// console.log('JWT Secret:', jwtSecret);


// Initialize Express app
const app = express();


// Body parser middleware
app.use(bodyParser.json()); // Parse JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/authRoutes')); // Authentication routes
app.use('/api/book', require('./routes/bookRoute')); // Resource routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
