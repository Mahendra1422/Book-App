const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000, 
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("\n MongoDB connection failed");
    console.error(`Error: ${error.message}`);
    console.error(`   Current URI: ${process.env.MONGO_URI || 'Not set'}`);
    process.exit(1);
  }
};

module.exports = connectDB;
