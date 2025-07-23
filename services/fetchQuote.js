import axios from "axios";
import Quote from "../models/Quote.js";

export async function fetchQuote() {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");
    const data = response.data[0];

    const quote = new Quote({
      text: data.q,
      author: data.a,
    });

    await quote.save();
    console.log("✅ Quote fetched and saved:", quote);
    return quote;
  } catch (error) {
    console.error("❌ Error in fetchQuote:", error.message);
    return null;
  }
}
