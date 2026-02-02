const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const Book = require("../models/Book");

const books = [
  {
    name: "The Great Gatsby",
    description: "A classic American novel set in the Jazz Age, exploring themes of decadence, idealism, and the American Dream.",
    author: "F. Scott Fitzgerald",
    publishDate: new Date("1925-04-10")
  },
  {
    name: "To Kill a Mockingbird",
    description: "A gripping tale of racial injustice and childhood innocence in the American South.",
    author: "Harper Lee",
    publishDate: new Date("1960-07-11")
  },
  {
    name: "1984",
    description: "A dystopian novel about surveillance, control, and truth.",
    author: "George Orwell",
    publishDate: new Date("1949-06-08")
  },
  {
    name: "Pride and Prejudice",
    description: "A romantic novel of manners and misunderstandings.",
    author: "Jane Austen",
    publishDate: new Date("1813-01-28")
  },
  {
    name: "The Catcher in the Rye",
    description: "A story about teenage rebellion and alienation.",
    author: "J.D. Salinger",
    publishDate: new Date("1951-07-16")
  },
  {
    name: "Lord of the Flies",
    description: "A group of boys struggle to govern themselves on an island.",
    author: "William Golding",
    publishDate: new Date("1954-09-17")
  },
  {
    name: "The Hobbit",
    description: "Bilbo Baggins goes on an unexpected adventure.",
    author: "J.R.R. Tolkien",
    publishDate: new Date("1937-09-21")
  },
  {
    name: "Fahrenheit 451",
    description: "A society where books are banned and burned.",
    author: "Ray Bradbury",
    publishDate: new Date("1953-10-19")
  },
  {
    name: "Moby Dick",
    description: "Captain Ahab hunts the great white whale.",
    author: "Herman Melville",
    publishDate: new Date("1851-10-18")
  },
  {
    name: "War and Peace",
    description: "A novel about war, history, and Russian society.",
    author: "Leo Tolstoy",
    publishDate: new Date("1869-01-01")
  },

  /* ---- 10 ---- */

  {
    name: "The Odyssey",
    description: "Odysseus journeys home after the Trojan War.",
    author: "Homer",
    publishDate: new Date("0800-01-01")
  },
  {
    name: "Crime and Punishment",
    description: "Psychological struggle after committing murder.",
    author: "Fyodor Dostoevsky",
    publishDate: new Date("1866-01-01")
  },
  {
    name: "The Brothers Karamazov",
    description: "A deep philosophical and moral exploration.",
    author: "Fyodor Dostoevsky",
    publishDate: new Date("1880-11-01")
  },
  {
    name: "One Hundred Years of Solitude",
    description: "A multi-generational family saga.",
    author: "Gabriel García Márquez",
    publishDate: new Date("1967-05-30")
  },
  {
    name: "The Picture of Dorian Gray",
    description: "A man remains young while his portrait ages.",
    author: "Oscar Wilde",
    publishDate: new Date("1890-07-01")
  },
  {
    name: "Brave New World",
    description: "A futuristic society built on genetic control.",
    author: "Aldous Huxley",
    publishDate: new Date("1932-01-01")
  },
  {
    name: "The Kite Runner",
    description: "Friendship and redemption in Afghanistan.",
    author: "Khaled Hosseini",
    publishDate: new Date("2003-05-29")
  },
  {
    name: "The Alchemist",
    description: "A shepherd searches for his destiny.",
    author: "Paulo Coelho",
    publishDate: new Date("1988-01-01")
  },
  {
    name: "Animal Farm",
    description: "A political allegory using farm animals.",
    author: "George Orwell",
    publishDate: new Date("1945-08-17")
  },
  {
    name: "Jane Eyre",
    description: "A strong woman's journey through hardship.",
    author: "Charlotte Brontë",
    publishDate: new Date("1847-10-16")
  },

  /* ---- 20 ---- */
];


const seedDatabase = async () => {
  try {
    // Check if MONGO_URI is set
    if (!process.env.MONGO_URI) {
      console.error("❌ Error: MONGO_URI is not set in .env file");
      console.error("   Please create a .env file in the root directory with:");
      console.error("   MONGO_URI=mongodb://127.0.0.1:27017/books_api");
      process.exit(1);
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing books
    await Book.deleteMany({});
    console.log("🗑️  Cleared existing books");

    // Insert seed data
    const insertedBooks = await Book.insertMany(books);
    console.log(`✅ Inserted ${insertedBooks.length} books`);

    // Display summary
    const authors = [...new Set(books.map(b => b.author))];
    console.log(`\n📊 Summary:`);
    console.log(`   - Total books: ${insertedBooks.length}`);
    console.log(`   - Authors: ${authors.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();

