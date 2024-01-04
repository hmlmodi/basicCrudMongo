const Book = require('../model/books'); // Assuming your model is named Book

exports.createBook = async (title, author) => {
  try {
    const book = new Book({
      title,
      author,
      // Add other fields here based on your Book model
    });

    const newBook = await book.save();
    return newBook;
  } catch (error) {
    console.error(error.message);
    throw new Error('Could not create book');
  }
};

exports.getAllBooks = async () => {
  try {
    const allBooks = await Book.find({});
    return allBooks;
  } catch (error) {
    console.error(error.message);
    throw new Error('Could not get books');
  }
};

exports.getSingleBookById = async (bookId) => {
  try {
    const book = await Book.findById(bookId);
    return book;
  } catch (error) {
    console.error(error.message);
    throw new Error('Could not get book');
  }
};

exports.updateBook = async (bookId, updatedFields) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, { $set: updatedFields }, { new: true });
    return updatedBook;
  } catch (error) {
    console.error(error.message);
    throw new Error('Could not update book');
  }
};

exports.deleteBookById = async (bookId) => {
  try {
    await Book.findOneAndDelete(bookId);
    return { message: 'Book removed' };
  } catch (error) {
    console.error(error.message);
    throw new Error('Could not delete book');
  }
};
