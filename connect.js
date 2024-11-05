const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`db connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("error connecting to db:", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
