const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB...");
  } catch (err) {
    console.log("Error in connecting DB...!" + err);
  }
};

module.exports = connectToDB;
