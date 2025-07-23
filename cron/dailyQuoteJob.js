import dotenv from "dotenv";
import mongoose from "mongoose";
import { fetchQuote } from "../services/fetchQuote.js";
import { sendEmail } from "../utils/sendEmail.js";
import Quote from "../models/Quote.js";

// Load env vars
dotenv.config();

(async () => {
  try {
    // Ensure DB connection before doing anything else
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Cron connected to MongoDB");

    const quote = await fetchQuote();

    if (quote) {
      await sendEmail({
        to: process.env.EMAIL_TO,
        subject: "🌟 Your Daily Motivation",
        text: `"${quote.text}" — ${quote.author}`,
      });
      console.log("📧 Email sent with today's quote!");
    } else {
      console.log("⚠️ No quote fetched. Email not sent.");
    }
  } catch (err) {
    console.error("❌ Error in dailyQuoteJob:", err);
  } finally {
    // Always close DB connection cleanly
    await mongoose.connection.close();
  }
})();
