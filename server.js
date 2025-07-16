const express = require("express");
const connectToDB = require("./config/db");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

connectToDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
