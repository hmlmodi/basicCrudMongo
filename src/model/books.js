const mongoose = require('mongoose');

// Schema for the Book model
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  // Other fields specific to your Book model
  // For example: description, genre, publication date, etc.
  // Add more fields as needed
});

// Creating the Book model based on the schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
