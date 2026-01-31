const express = require("express");
const router = express.Router();

const {
  createBook,
  getBooks
} = require("../controllers/book.controller");

/* -------------------- ROUTES -------------------- */

// Explore books
router.get("/", getBooks);

// Create book
router.post("/", createBook);

router.get("/new", (req, res) => {
  res.render("books/create");
});

router.get("/create", (req, res) => {
  res.render("books/create");
});

module.exports = router;




