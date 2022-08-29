const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "production") {
      await mongoose.connect(process.env.MONGO_URI);
    } else {
      await mongoose.connect("mongodb://localhost:27017/mernArticles");
      console.log("Connected to mongoDB successfully 👍");
    }
    
  } catch (error) {
    console.log("could not connect to database ❌");
    process.exit(1);
  }
};
module.exports = connectDB;
