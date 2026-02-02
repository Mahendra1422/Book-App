# Books API

A minimal RESTful API for managing books built with Node.js, Express, and MongoDB. Supports full-text search, filtering, pagination, and sorting.

## Features

- ✅ Create books with validation
- ✅ Search books by name/description (case-insensitive)
- ✅ Filter by author (exact match, case-insensitive)
- ✅ Filter by publish date range
- ✅ Pagination (default: 10 per page, max: 50)
- ✅ Sorting by name, author, or publishDate (ascending/descending)
- ✅ Web interface for easy book management
- ✅ Interactive API testing tool (mini Postman UI)
- ✅ RESTful API endpoints

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **View Engine**: EJS
- **Language**: JavaScript

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/books_api
```

**For MongoDB Atlas:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/books_api?retryWrites=true&w=majority
```

### 3. Start MongoDB

**Local MongoDB:**
- Windows: Start MongoDB service or run `mongod`
- Mac/Linux: `mongod` or `brew services start mongodb-community`

**Or use MongoDB Atlas** (cloud - no installation needed)

### 4. Seed the Database (Optional)

Populate the database with sample books:

```bash
npm run seed
```

This will insert 18 diverse books with multiple authors and varied publish dates.

### 5. Run the Application

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Create Book

**POST** `/books`

Creates a new book and returns the created entity with server-generated ID.

**Request Body (JSON):**
```json
{
  "name": "Book Name",
  "description": "Book description (max 2000 characters)",
  "author": "Author Name",
  "publishDate": "2024-01-15"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Book Name",
  "description": "Book description",
  "author": "Author Name",
  "publishDate": "2024-01-15T00:00:00.000Z",
  "createdAt": "2024-01-20T10:30:00.000Z",
  "updatedAt": "2024-01-20T10:30:00.000Z"
}
```

**Required Fields:** `name`, `description`, `author`  
**Optional Fields:** `publishDate` (ISO date format)

---

### Explore Books (Search & Filter)

**GET** `/books`

Returns a paginated list of books with support for search, filtering, and sorting.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `search` | string | - | Text search in `name` and `description` (case-insensitive, substring) |
| `author` | string | - | Filter by exact author name (case-insensitive) |
| `from` | date (ISO) | - | Filter by publish date (from, inclusive) |
| `to` | date (ISO) | - | Filter by publish date (to, inclusive) |
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page (max: 50) |
| `sortBy` | string | createdAt | Sort field: `name`, `author`, `publishDate`, or `createdAt` |
| `order` | string | asc | Sort order: `asc` or `desc` |

**Response (200 OK):**
```json
{
  "page": 1,
  "limit": 10,
  "total": 25,
  "results": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "The Great Gatsby",
      "description": "A classic American novel...",
      "author": "F. Scott Fitzgerald",
      "publishDate": "1925-04-10T00:00:00.000Z",
      "createdAt": "2024-01-20T10:30:00.000Z",
      "updatedAt": "2024-01-20T10:30:00.000Z"
    }
  ]
}
```

**Example Requests:**

```bash
# Search for books containing "gatsby"
GET /books?search=gatsby

# Filter by author
GET /books?author=F. Scott Fitzgerald

# Date range filter
GET /books?from=1920-01-01&to=1950-12-31

# Combined search, filter, and sort
GET /books?search=novel&author=George Orwell&sortBy=publishDate&order=desc&page=1&limit=20

# Pagination
GET /books?page=2&limit=5
```

---

### Health Check

**GET** `/health`

Returns server status.

**Response:**
```json
{
  "status": "OK"
}
```

## Web Interface

- **Homepage**: `http://localhost:3000/` - Welcome page with navigation
- **View Books**: `http://localhost:3000/books` - Browse, search, and filter books
- **Create Book**: `http://localhost:3000/books/create` - Add a new book via form
- **API Tester**: `http://localhost:3000/test` - Interactive API testing tool (mini Postman UI)

## Data Model

### Book Schema

```javascript
{
  name: String (required, trimmed)
  description: String (required, max 2000 chars, trimmed)
  author: String (required, trimmed)
  publishDate: Date (optional, ISO format)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

### Indexes

The following indexes are created for performance:

- **Text Index**: `name` and `description` (for search)
- **Author Index**: `author` (for filtering)
- **Date Index**: `publishDate` (for date range filtering)

## Usage Examples

### Using cURL

**Create a book:**
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "name": "The Catcher in the Rye",
    "description": "A controversial novel about teenage rebellion",
    "author": "J.D. Salinger",
    "publishDate": "1951-07-16"
  }'
```

**Search books:**
```bash
curl "http://localhost:3000/books?search=novel&page=1&limit=5"
```

**Filter by author and date range:**
```bash
curl "http://localhost:3000/books?author=George%20Orwell&from=1940-01-01&to=1950-12-31"
```

### Using JavaScript (Fetch API)

```javascript
// Create a book
const response = await fetch('http://localhost:3000/books', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: '1984',
    description: 'A dystopian novel',
    author: 'George Orwell',
    publishDate: '1949-06-08'
  })
});
const book = await response.json();

// Search books
const searchResponse = await fetch(
  'http://localhost:3000/books?search=novel&sortBy=name&order=asc'
);
const data = await searchResponse.json();
```

## API Documentation

The API is documented using OpenAPI 3.0 specification. The OpenAPI file (`openapi.yaml`) can be imported into:
- **Postman**: Import the `openapi.yaml` file
- **Insomnia**: Import the `openapi.yaml` file
- **Swagger UI**: Use any OpenAPI viewer

**OpenAPI File**: `openapi.yaml` in the root directory

The specification includes:
- **POST /books** - Create book endpoint
- **GET /books** - Explore books with all query parameters (search, filter, pagination, sorting)

## Project Structure

```
Book-API/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── book.controller.js # Book business logic
│   ├── models/
│   │   └── Book.js            # Book Mongoose model
│   ├── routes/
│   │   └── book.routes.js     # Book routes
│   ├── scripts/
│   │   └── seed.js            # Database seed script
│   ├── views/
│   │   ├── books/             # EJS templates
│   │   ├── partials/          # Layout partials
│   │   └── layout.ejs         # Main layout
│   ├── public/
│   │   └── style.css          # Styles
│   ├── app.js                 # Express app setup
│   └── server.js              # Server entry point
├── .env                       # Environment variables
├── openapi.yaml              # OpenAPI 3.0 specification
├── package.json
└── README.md
```

## Troubleshooting

### MongoDB Connection Error

**Error:** `ECONNREFUSED 127.0.0.1:27017`

**Solutions:**
1. Ensure MongoDB is running: `mongod` or start MongoDB service
2. Check your `.env` file has the correct `MONGO_URI`
3. For MongoDB Atlas, verify your connection string is correct

### Port Already in Use

Change the `PORT` in your `.env` file to a different port (e.g., 3001).

## API Testing Tool

The application includes an interactive API testing interface at `/test` that provides a mini Postman-like experience:

- **Test GET requests** with query parameters (search, filter, pagination, sorting)
- **Test POST requests** with JSON body
- **View responses** with formatted JSON output
- **Live books list** that automatically refreshes

**Access the tester:** `http://localhost:3000/test`

This tool is perfect for:
- Testing API endpoints without external tools
- Learning the API structure
- Quick debugging and development
- Demonstrating API capabilities

