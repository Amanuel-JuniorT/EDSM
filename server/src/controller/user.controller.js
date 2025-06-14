import Portfolio from "../models/ownedStock.model.js";
import User from "../models/user.model.js";
import Wallet from "../models/wallet.model.js";
import Stock from "../models/stock.model.js";

export const getBalance = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Fetch the user's balance from the database
    const balance = await Wallet.findOne({ userId: userId }).select(
      "balance -_id"
    );
    if (!balance) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ balance: balance.balance });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBalance = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user
    const { amount } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (typeof amount !== "number") {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // Update the user's balance in the database
    const wallet = await Wallet.findOneAndUpdate(
      { userId: userId },
      { $inc: { balance: amount } },
      { new: true }
    );

    if (!wallet) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ balance: wallet.balance });
  } catch (error) {
    console.error("Error updating balance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOwnedStocks = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Fetch the user's owned stocks from the database
    const ownedStocks = await Portfolio.find({ userId: userId });
    if (!ownedStocks || ownedStocks.length === 0) {
      return res.status(404).json({ message: "No owned stocks found" });
    }

    const stocks = await Promise.all(
      ownedStocks.map(async (stock) => {
        const stockDetail = await Stock.findById(stock.stockId);
        return {
          portfolioId: stock._id,
          name: stockDetail.name,
          symbol: stockDetail.symbol,
          quantity: stock.quantity,
          unitPrice: parseFloat(
            stockDetail.unitPrice?.$numberDecimal || stockDetail.unitPrice
          ),
          totalValue: stock.quantity * stockDetail.unitPrice,
        };
      })
    );

    return res
      .status(200)
      .json({ message: "Fetched successfully", ownedStocks: stocks });
  } catch (error) {
    console.error("Error fetching owned stocks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addOwnedStock = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user
    const { stockId, quantity } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!stockId || typeof quantity !== "number") {
      return res.status(400).json({ message: "Invalid stock data" });
    }

    // Check if the user already owns this stock
    const existingStock = await Portfolio.findOne({
      userId: userId,
      stockId: stockId,
    });

    if (existingStock) {
      // If the stock already exists, update the quantity
      existingStock.quantity += quantity;
      await existingStock.save();
      return res
        .status(200)
        .json({ message: "Stock quantity updated", stock: existingStock });
    }
    // If the stock does not exist, create a new entry

    const newOwnedStock = new Portfolio({
      userId: userId,
      stockId: stockId,
      quantity: quantity,
    });

    await newOwnedStock.save();

    res
      .status(201)
      .json({ message: "Stock added successfully", stock: newOwnedStock });
  } catch (error) {
    console.error("Error adding owned stock:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sellOwnedStock = async (req, res) => {
  try {
    const userId = req.user._id;

    const { portfolioId, quantity } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated!" });
    }

    if (!portfolioId || !quantity || typeof quantity !== "number") {
      return res.status(400).json({ message: "Invalid portfolio" });
    }

    const portfolio = await Portfolio.findById(portfolioId);

    if (!portfolio) {
      return res.status(404).json({ message: "Couldn't find portfolio" });
    }

    if (quantity > portfolio.quantity) {
      return res.status(400).json({ message: "Insufficient stock value" });
    }

    if (quantity < portfolio.quantity) {
      portfolio.quantity -= quantity;
      await portfolio.save();
      return res
        .status(200)
        .json({ message: "Owned stock deducted successfully" });
    }

    if (quantity == portfolio.quantity) {
      await portfolio.deleteOne();
      return res
        .status(200)
        .json({ message: "Owned stock removed successfully" });
    }
  } catch (error) {
    console.error("Error at sellOwnedStock: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

