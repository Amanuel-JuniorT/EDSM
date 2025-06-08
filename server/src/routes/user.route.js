import express from "express";
import {
  addOwnedStock,
  getBalance,
  getOwnedStocks,
  updateBalance,
} from "../controller/user.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/balance", protectedRoute, getBalance);
router.post("/update_balance", protectedRoute, updateBalance);
router.post("/buy_stock", protectedRoute, addOwnedStock);
router.get("/owned_stocks", protectedRoute, getOwnedStocks); // Assuming this is the correct endpoint for owned stocks

export default router;
