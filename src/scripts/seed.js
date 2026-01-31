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

  {
    name: "Wuthering Heights",
    description: "A tragic love story on the Yorkshire moors.",
    author: "Emily Brontë",
    publishDate: new Date("1847-12-01")
  },
  {
    name: "The Divine Comedy",
    description: "A journey through Hell, Purgatory, and Heaven.",
    author: "Dante Alighieri",
    publishDate: new Date("1320-01-01")
  },
  {
    name: "Dracula",
    description: "A gothic horror novel about vampires.",
    author: "Bram Stoker",
    publishDate: new Date("1897-05-26")
  },
  {
    name: "Frankenstein",
    description: "A scientist creates a living monster.",
    author: "Mary Shelley",
    publishDate: new Date("1818-01-01")
  },
  {
    name: "The Shining",
    description: "A family haunted in a remote hotel.",
    author: "Stephen King",
    publishDate: new Date("1977-01-28")
  },
  {
    name: "It",
    description: "A shape-shifting evil terrorizes a town.",
    author: "Stephen King",
    publishDate: new Date("1986-09-15")
  },
  {
    name: "Dune",
    description: "Politics, power, and prophecy on a desert planet.",
    author: "Frank Herbert",
    publishDate: new Date("1965-08-01")
  },
  {
    name: "The Da Vinci Code",
    description: "A mystery involving secret societies.",
    author: "Dan Brown",
    publishDate: new Date("2003-03-18")
  },
  {
    name: "Harry Potter and the Sorcerer's Stone",
    description: "A boy discovers he is a wizard.",
    author: "J.K. Rowling",
    publishDate: new Date("1997-06-26")
  },
  {
    name: "The Lord of the Rings",
    description: "An epic quest to destroy a powerful ring.",
    author: "J.R.R. Tolkien",
    publishDate: new Date("1954-07-29")
  },

  /* ---- 30 ---- */

  {
    name: "The Hunger Games",
    description: "A dystopian survival competition.",
    author: "Suzanne Collins",
    publishDate: new Date("2008-09-14")
  },
  {
    name: "The Fault in Our Stars",
    description: "A love story between two cancer patients.",
    author: "John Green",
    publishDate: new Date("2012-01-10")
  },
  {
    name: "Gone Girl",
    description: "A psychological thriller about marriage.",
    author: "Gillian Flynn",
    publishDate: new Date("2012-06-05")
  },
  {
    name: "The Book Thief",
    description: "A story narrated by Death during WWII.",
    author: "Markus Zusak",
    publishDate: new Date("2005-03-14")
  },
  {
    name: "Life of Pi",
    description: "A boy survives at sea with a tiger.",
    author: "Yann Martel",
    publishDate: new Date("2001-09-11")
  },
  {
    name: "The Road",
    description: "A father and son survive a post-apocalyptic world.",
    author: "Cormac McCarthy",
    publishDate: new Date("2006-09-26")
  },
  {
    name: "The Giver",
    description: "A society without pain or choice.",
    author: "Lois Lowry",
    publishDate: new Date("1993-04-26")
  },
  {
    name: "The Handmaid's Tale",
    description: "A dystopian future with enforced roles.",
    author: "Margaret Atwood",
    publishDate: new Date("1985-09-01")
  },
  {
    name: "The Martian",
    description: "An astronaut survives alone on Mars.",
    author: "Andy Weir",
    publishDate: new Date("2011-02-11")
  },
  {
    name: "Ready Player One",
    description: "A virtual reality treasure hunt.",
    author: "Ernest Cline",
    publishDate: new Date("2011-08-16")
  }

  /* ---- 50 TOTAL ---- */
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
    console.log(`   - Unique authors: ${authors.length}`);
    console.log(`   - Authors: ${authors.join(", ")}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();

