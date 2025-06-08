import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useStocksStore = create((set) => ({
  // --- Stocks state ---
  stocks: [],
  isLoadingStocks: false,

  // Fetch all stocks
  fetchStocks: async () => {
    set({ isLoadingStocks: true });
    try {
      const response = await axiosInstance.get("/stocks/getAllStocks");

      // Normalize decimal fields to numbers
      const normalizedStocks = response.data.map((stock) => ({
        ...stock,
        unitPrice: parseFloat(stock.unitPrice?.$numberDecimal || stock.unitPrice),
        change: parseFloat(stock.change?.$numberDecimal || stock.change),
      }));

      set({ stocks: normalizedStocks });
    } catch (error) {
      toast.error(
        "Error fetching stocks: " + (error.response?.data?.message || "Unknown error")
      );
    } finally {
      set({ isLoadingStocks: false });
    }
  },

  // Get stock by symbol
  getStockBySymbol: (symbol) => {
    return useStocksStore
      .getState()
      .stocks.find((stock) => stock.symbol === symbol);
  },
}));
