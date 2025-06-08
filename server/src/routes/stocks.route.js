import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getAllStocks } from "../controller/stocks.controller.js";
import Stock from "../models/stock.model.js";

const router = express.Router();

router.get("/getAllStocks", getAllStocks);

router.post("/addStocks", async (req, res) => {
  const { stocks } = req.body;
  try {
    const { stocks } = req.body;

    if (!stocks || !Array.isArray(stocks)) {
      return res.status(400).json({ message: "Invalid stocks data" });
    }

    stocks.forEach((stock) => {
      if (!stock.name || !stock.price) {
        throw new Error("Missing required stock fields");
      }
      const newStock = new Stock({
        symbol: stock.symbol,
        name: stock.name,
        unitPrice: stock.price,
        change: stock.change || 0.0,
        minAmount: stock.minAmount,
        status: stock.status || "active",
        sector: "Other",
      });
      newStock.save();
    });
    res.status(201).json({ message: "Stocks added successfully" });
  } catch (error) {
    console.error("Error adding stocks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
