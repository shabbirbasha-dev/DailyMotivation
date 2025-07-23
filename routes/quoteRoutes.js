import express from "express";
import Quote from "../models/Quote.js";

const router = express.Router();

// Add a new quote
router.post("/", async (req, res) => {
  try {
    const { text, author } = req.body;
    const newQuote = new Quote({ text, author });
    await newQuote.save();
    res
      .status(201)
      .json({ message: "Quote added successfully", quote: newQuote });
  } catch (error) {
    res.status(500).json({ error: "Failed to add quote" });
  }
});

// Get all quotes
router.get("/", async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ dateAdded: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});

export default router;
