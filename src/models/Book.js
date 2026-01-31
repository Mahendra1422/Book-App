const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Book name is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 2000
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true
    },
    publishDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Indexes for performance
bookSchema.index({ name: "text", description: "text" }); // Text search index
bookSchema.index({ author: 1 }); // Author filter index
bookSchema.index({ publishDate: 1 }); // Date range filter index

module.exports = mongoose.model("Book", bookSchema);
