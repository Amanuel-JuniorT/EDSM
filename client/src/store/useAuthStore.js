import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
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

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/getUser");
      if (res.status == 200) {
        set({
        user: res.data.user,
        });
      }
      set({ isCheckingAuth: false });
    } catch (error) {
      set({ user: null }); 
      if (error.response == null) {
        return toast.error("Could not connect to server");
      } 
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ user: res.data.user });
      toast.success("Account created successfully");
      return true;
    } catch (error) {
      error.response == null ? toast.error("Couldn't connect to the server") : toast.error("Error signing up: " + error.response.data.message);
      return false;
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ user: res.data });
      toast.success("Logged in successfully");
      return true;
    } catch (error) {
      error.response == null ? toast.error("Couldn't connect to the server") : toast.error("Error logging in: " + error.response.data.message);
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async (showToast) => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
      showToast && toast.success("Logged out successfully");
      return true;
    } catch (error) {
      error.response == null ? showToast ? toast.error("Couldn't connect to the server") : console.error("Couldn't connect to the server") : showToast ? toast.error("Error logging out: " + error.response.data.message) : console.error("Error logging out: " + error.response.data.message);
      return false;
    }
  },

  sendOTP: async (user, purpose) => {
    set({ isSendingOTP: true });
    if (!user || !purpose) {
      set({ isSendingOTP: false });
      toast.error("Invalid user or purpose");
      return false
    }
    try {
      await axiosInstance.post(`/auth/sendOTP?purpose=${purpose}`);
      toast.success("OTP sent to " + user.email);
      set({ isSendingOTP: false });
      return true;
    } catch (error) {
      error.response == null ? toast.error("Couldn't connect to the server") : toast.error("Error sending OTP: " + error.response.data.message);
      set({ isSendingOTP: false });
      return false;
    } finally {
      set({ isSendingOTP: false });
    } 
  },

  verifyOTP: async (code, purpose) => {
    set({ isVerifyingEmail: true });
    if ( !code || !purpose) {
      set({ isVerifyingEmail: false });
      toast.error("Invalid user, code or purpose");
      return false;
    }
    try {
      const res = await axiosInstance.post(`/auth/verifyOTP?purpose=${purpose}`, { code });
      set({ user: res.data.user });
      toast.success("OTP verified successfully");
      return true;
    } catch (error) {
      error.response == null ? toast.error("Couldn't connect to the server") : toast.error("Error verifying OTP: " + error.response.data.message);
      return false;
    } finally {
      set({ isVerifyingEmail: false });
    }
  },

<<<<<<< HEAD
  clearUser: () => set({ user: null}),
  
=======
  // --- Logout (clears user) ---
  logout: () => set({ user: null }),
>>>>>>> a74ec12b93324f9a7bdea4b968c69d14f74a1bd8
}));
