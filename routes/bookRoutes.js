const express = require("express");
const {
  getBooks,
  addBook,
  deleteBook,
} = require("../controllers/bookController");
const verifyToken = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");
const router = express.Router();

router.get("/", verifyToken, getBooks);
router.post("/", verifyToken, checkRole("admin", "editor"), addBook);
router.delete("/:id", verifyToken, checkRole("admin", "editor"), deleteBook);

module.exports = router;
