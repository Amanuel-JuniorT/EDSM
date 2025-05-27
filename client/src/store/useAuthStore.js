import { create } from "zustand";
// import { axiosInstance } from "../lib/axios"; // TODO: Restore when axios utility is available
import {toast} from "react-hot-toast";

/*
  useAuthStore.js - Authentication state and logic for EDSM
  --------------------------------------------------------
  - Handles user authentication, session, and auth checks.
  - Integrates with backend API for login, logout, and session validation.
  - For backend/frontend devs: Add or update API endpoints here as needed.
*/

// useAuthStore.js - Zustand store for authentication state (mocked for UI testing)
export const useAuthStore = create((set) => ({
  // --- Auth state ---
  user: null,
  isCheckingAuth: true,
  error: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isVerifyingEmail: false,
  isSendingOTP: false,

  // --- Mocked checkAuth for UI testing (always sets a fake user) ---
  checkAuth: async () => {
    set({
      user: {
        id: "mock123",
        name: "Nati",
        email: "nati@edsm.et",
        isVerified: true
      },
      isCheckingAuth: false
    });
  },

  // --- Mocked signup (sets user immediately) ---
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      // const res = await axiosInstance.post("/auth/signup", data); // TODO: Restore
      set({ user: { ...data, id: "mock123" }, isSigningUp: false });
    } catch (error) {
      set({ error: error.message, isSigningUp: false });
      toast.error(error.message);
    }
  },

  // --- Mocked sendOTP (no real API call) ---
  sendOTP: async (purpose) => {
    set({ isSendingOTP: true });
    try {
      // await axiosInstance.post(`/auth/sendOTP?purpose=${purpose}`); // TODO: Restore
      set({ isSendingOTP: false });
    } catch (error) {
      set({ error: error.message, isSendingOTP: false });
      toast.error(error.message);
    }
  },

  // --- Mocked verifyOTP (sets user as verified) ---
  verifyOTP: async (purpose, code) => {
    set({ isVerifyingEmail: true });
    try {
      // const res = await axiosInstance.post(`/auth/verifyOTP?purpose=${purpose}`, { code }); // TODO: Restore
      set({ user: { ...user, isVerified: true }, isVerifyingEmail: false });
    } catch (error) {
      set({ error: error.message, isVerifyingEmail: false });
      toast.error(error.message);
    }
  },

  // --- Logout (clears user) ---
  logout: () => set({ user: null }),
}));
