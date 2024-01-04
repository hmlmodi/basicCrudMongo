const multer = require('multer');
const BookService = require('../service/resourceService');
const { validationResult } = require('express-validator');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the file name for uploaded files
  },
});

// Create multer instance with storage configuration
const upload = multer({ storage: storage }).single('image');

exports.createBook = async (req, res) => {
  // Handle file upload
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // Handle multer error
      return res.status(500).json({ message: 'File upload error' });
    } else if (err) {
      // Handle other errors
      console.error(err.message);
      return res.status(500).send('Server Error');
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author } = req.body;
    const image = req.file ? req.file.path : null;

    try {
      const newBook = await BookService.createBook(title, author, image);
      res.json(newBook);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
};

exports.getAllBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const allBooks = await BookService.getAllBooks(page, limit);
    res.json(allBooks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.getSingleBookById = async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await BookService.getSingleBookById(bookId);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.updateBook = async (req, res) => {
  const bookId = req.params.id;
  const updatedFields = req.body;

  try {
    const updatedBook = await BookService.updateBook(bookId, updatedFields);
    if (!updatedBook) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteBookById = async (req, res) => {
  const bookId = req.params.id;

  try {
    const deletionResult = await BookService.deleteBookById(bookId);
    if (!deletionResult) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.json(deletionResult);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
