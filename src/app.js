const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

const connectDB = require("./config/db");
const bookRoutes = require("./routes/book.routes");

const app = express();

/* DB - Connection will be handled in server.js */

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* View Engine */
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layout");

/* Static files (optional later) */
app.use(express.static(path.join(__dirname, "public")));

/* Routes */
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/books", bookRoutes);

app.get("/test", (req, res) => {
  res.render("test", { layout: false });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = app;
