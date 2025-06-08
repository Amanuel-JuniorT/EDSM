import Stock from "../models/stock.model.js";

export const getAllStocks = async (req, res) => {
  try {
    // Check if the user is authenticated
    // if (!req.user) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    // Fetch all stocks from the database
    const stocks = await Stock.find({ status: "active" })

    // Check if stocks are found
    if (stocks.length === 0) {
      return res.status(404).json({ message: "No stocks found" });
    }

    // Return the list of stocks
    res.status(200).json(stocks);
  } catch (error) {
    console.error("Error fetching stocks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
