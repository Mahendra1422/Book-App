const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 10s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("\n❌ MongoDB connection failed");
    console.error(`Error: ${error.message}`);
    console.error("\n💡 Solutions:");
    console.error("   1. If using local MongoDB:");
    console.error("      - Make sure MongoDB is installed and running");
    console.error("      - Start MongoDB: mongod (or start MongoDB service)");
    console.error("      - Verify: mongosh --eval 'db.version()'");
    console.error("\n   2. If using MongoDB Atlas:");
    console.error("      - Update MONGO_URI in .env with your Atlas connection string");
    console.error("      - Format: mongodb+srv://username:password@cluster.mongodb.net/dbname");
    console.error("\n   3. Check your .env file has the correct MONGO_URI");
    console.error(`   Current URI: ${process.env.MONGO_URI || 'Not set'}`);
    process.exit(1);
  }
};

module.exports = connectDB;
