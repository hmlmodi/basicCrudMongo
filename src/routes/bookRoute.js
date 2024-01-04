const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController');
const authMiddleware = require('../middleware/authmiddleware');

// Apply authentication middleware to all routes in this router
router.use(authMiddleware);

// Create a book
router.post('/create-book', bookController.createBook);

// Get all books
router.get('/get-books', bookController.getAllBooks);

// Get single book by ID
router.get('/get-book/:id', bookController.getSingleBookById);

// Update a book
router.put('/update-book/:id', bookController.updateBook);

// Delete a book
router.delete('/delete-book/:id', bookController.deleteBookById);

module.exports = router;
