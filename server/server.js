const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const transactionRoutes = require("./routes/transactionRoutes");
const authRoutes = require("./routes/authRoutes");


const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Budget Tracker API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});