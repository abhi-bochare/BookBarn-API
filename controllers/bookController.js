const Book = require("../models/Book");

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ deleted: false }).populate("author");
    res.status(200).json(books);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in fetching books", error: err.message });
  }
};

const addBook = async (req, res) => {
  try {
    const newBook = req.body;
    const book = await Book.create(newBook);
    res.status(201).json({ message: "Book added Successfully", book: book });
  } catch (err) {
    res.status(400).json({ message: "Failed to add book", error: err.message });
  }
};

const deleteBook = async (req, res) => {
  const id = req.params.id;
  try {
    await Book.findByIdAndUpdate(id, { deleted: true });
    res.json({ message: "Book Soft-deleted Successfully.." });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to delete book..!", error: err.message });
  }
};

module.exports = {
  getBooks,
  addBook,
  deleteBook,
};
