const Book = require("../models/Book");

/* ---------------- CREATE BOOK ---------------- */
exports.createBook = async (req, res) => {
  try {
    const { name, description, author, publishDate } = req.body;

    if (!name || !description || !author) {
      return res.status(400).json({
        message: "name, description and author are required"
      });
    }

    const book = await Book.create({
      name,
      description,
      author,
      publishDate
    });

    // EJS form submit
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.redirect("/books");
    }

    return res.status(201).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ---------------- EXPLORE BOOKS ---------------- */
exports.getBooks = async (req, res) => {
  try {
    const {
      search,
      author,
      from,
      to,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "asc"
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    if (author) {
      query.author = new RegExp(`^${author}$`, "i");
    }

    if (from || to) {
      query.publishDate = {};
      if (from) query.publishDate.$gte = new Date(from);
      if (to) query.publishDate.$lte = new Date(to);
    }

    const pageNumber = parseInt(page);
    const pageLimit = Math.min(parseInt(limit), 50);
    const skip = (pageNumber - 1) * pageLimit;

    const sort = {
      [sortBy]: order === "desc" ? -1 : 1
    };

    const books = await Book.find(query)
      .sort(sort)
      .skip(skip)
      .limit(pageLimit);

    const total = await Book.countDocuments(query);

    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.render("books/index", {
        books,
        page: pageNumber,
        limit: pageLimit,
        total,
        search,
        author,
        from,
        to,
        sortBy,
        order
      });
    }

    return res.json({
      page: pageNumber,
      limit: pageLimit,
      total,
      results: books
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
