// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Base URL: /api/auth

// Register a new user
router.post('/register', authController.registerUser);

// Login user
router.post('/login', authController.loginUser);

module.exports = router;
