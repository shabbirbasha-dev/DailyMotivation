import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import quoteRoutes from "./routes/quoteRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Daily Boost Email API is running 🚀");
});

// Mount the quote routes
app.use("/api/quotes", quoteRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {
    console.log("✅ Connected to MongoDB");
    // Start server only after DB connects
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// 👇 Import after MongoDB is connected
import "./cron/dailyQuoteJob.js";
