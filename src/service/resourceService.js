// Assuming Book model has 'image' field for the image path
const Book = require('../model/books');


exports.createBook = async (title, author, image) => {
  try {
    const book = new Book({
      title,
      author,
      image,
    });

    const newBook = await book.save();
    return newBook;
  } catch (error) {
    console.error(error.message);
    throw new Error('Could not create book');
  }
};

exports.getAllBooks = async (page, limit) => {
  try {
    const allBooks = await Book.find({})
      .skip((page - 1) * limit)
      .limit(limit);
    
    // Map each book to include the image URL
    const booksWithImageURL = allBooks.map(book => ({
      ...book.toJSON(),
      imageURL: `http://localhost:3000/${book.image}`, // Construct the image URL
    }));
    
    return booksWithImageURL;
  } catch (error) {
    console.error(error.message);
    throw new Error('Could not get books');
  }
};

exports.getSingleBookById = async (bookId) => {
  try {
    const book = await Book.findById(bookId);
    if (!book) return null;
    
    const bookWithImageURL = {
      ...book.toJSON(),
      imageURL: `http://localhost:3000/${book.image}`, // Construct the image URL
    };
    
    return bookWithImageURL;
  } catch (error) {
    console.error(error.message);
    throw new Error('Could not get book');
  }
};

exports.updateBook = async (bookId, updatedFields) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, { $set: updatedFields }, { new: true });
    if (!updatedBook) return null;

    const updatedBookWithImageURL = {
      ...updatedBook.toJSON(),
      imageURL: `http://localhost:3000/${updatedBook.image}`, // Construct the image URL
    };

    return updatedBookWithImageURL;
  } catch (error) {
    console.error(error.message);
    throw new Error('Could not update book');
  }
};

exports.deleteBookById = async (bookId) => {
  try {
    const deletionResult = await Book.findOneAndDelete({ _id: bookId });
    if (!deletionResult) return null;
    
    return { message: 'Book removed' };
  } catch (error) {
    console.error(error.message);
    throw new Error('Could not delete book');
  }
};
