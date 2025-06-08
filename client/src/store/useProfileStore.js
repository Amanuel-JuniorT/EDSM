import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

// useDashboardStore.js - Zustand store for dashboard state
export const useProfileStore = create((set) => ({
  // --- Dashboard state ---
  ownedStocks: [],
  isUpdatingBalance: false,
  isLoadingBalance: false,
  isLoadingOwnedStocks: false,
  isBuyingStock: false,
  isSellingStock: false,
  balance: null,

  getBalance: async () => {
    const { user } = useAuthStore.getState();

    if (!user) {
      toast.error("User not authenticated");
      return null;
    }
    try {
      set({ isLoadingBalance: true });
      const res = await axiosInstance.get(`/user/balance/`);
      set({ balance: res.data.balance });
      set({ isLoadingBalance: false });
      return res.data.balance;
    } catch (error) {
      set({ isLoadingBalance: false });
      toast.error(
        "Error fetching balance: " + error.response?.data?.message ||
          "Unknown error"
      );
      return null;
    } finally {
      set({ isLoadingBalance: false });
    }
  },

  getStocks: async () => {
    const { user } = useAuthStore.getState();
    if (!user) {
      toast.error("User not authenticated");
      return [];
    }
    set({ isLoadingOwnedStocks: true });
    try {
      const res = await axiosInstance.get(`/user/owned_stocks`);
      set({ ownedStocks: res.data.ownedStocks });
      return res.data;
    } catch (error) {
      set({ ownedStocks: [] }); // <-- set to empty array on error
      toast.error(
        "Error fetching stocks: " + error.response?.data?.message ||
          "Unknown error"
      );
      return [];
    } finally {
      set({ isLoadingOwnedStocks: false });
    }
  },

  updateBalance: async (amount) => {
    const { user, refreshWallet } = useAuthStore.getState();
    if (!user) {
      toast.error("User not authenticated");
      return false;
    }
    if (typeof amount !== "number") {
      toast.error("Invalid amount");
      return false;
    }
    try {
      set({ isUpdatingBalance: true });
      const res = await axiosInstance.post("/user/update_balance", { amount });
      set({ balance: res.data.balance });
      refreshWallet(); // Refresh the wallet state in auth store
      toast.success("Balance updated successfully");
      set({ isUpdatingBalance: false });
      return true;
    } catch (error) {
      set({ isUpdatingBalance: false });
      toast.error(
        "Error updating balance: " + error.response?.data?.message ||
          "Unknown error"
      );
      return false;
    }
  },

  buyStock: async (stock, quantity) => {
    const { user, refreshWallet } = useAuthStore.getState();
    if (!user) {
      toast.error("User not authenticated");
      return false;
    }
    if (typeof quantity !== "number" || quantity <= 0) {
      toast.error("Invalid quantity");
      return false;
    }
    set({ isBuyingStock: true });
    try {
      const res = await axiosInstance.post("/user/buy_stock", {
        stockId: stock._id,
        quantity,
      });
      set((state) => ({
        ownedStocks: [...state.ownedStocks, res.data.stock],
      }));
      refreshWallet(); // Refresh the wallet state in auth store
      toast.success("Stock bought successfully");
      set({ isBuyingStock: false });
      return true;
    } catch (error) {
      set({ isBuyingStock: false });
      toast.error(
        "Error buying stock: " + error.response?.data?.message ||
          "Unknown error"
      );
      return false;
    }
  },

  sellStock: async (ownedStock, quantity) => {
    const { user, refreshWallet } = useAuthStore.getState();
    if (!user) {
      toast.error("User not authenticated");
      return false;
    }
    if (typeof quantity !== "number" || quantity <= 0) {
      toast.error("Invalid quantity");
      return false;
    }
    set({ isBuyingStock: true });
    try {
      const res = await axiosInstance.post("/user/buy_stock", {
        portfolioId: ownedStock._id,
        quantity,
      });
      set((state) => ({
        ownedStocks: [...state.ownedStocks, res.data.stock],
      }));
      refreshWallet(); // Refresh the wallet state in auth store
      toast.success("Stock bought successfully");
      set({ isBuyingStock: false });
      return true;
    } catch (error) {
      set({ isBuyingStock: false });
      toast.error(
        "Error buying stock: " + error.response?.data?.message ||
          "Unknown error"
      );
      return false;
    }
  },
}));
