import express from "express";
import {
  addOwnedStock,
  getBalance,
  getOwnedStocks,
  updateBalance,
  sellOwnedStock,
} from "../controller/user.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/balance", protectedRoute, getBalance);
router.post("/update_balance", protectedRoute, updateBalance);
router.post("/buy_stock", protectedRoute, addOwnedStock);
router.post("/sell_stock", protectedRoute, sellOwnedStock);
router.get("/owned_stocks", protectedRoute, getOwnedStocks); 

export default router;
