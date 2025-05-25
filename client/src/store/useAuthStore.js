import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import {toast} from "react-hot-toast";

export const useAuthStore = create((set) => ({
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
        user: res.data,
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
      return toast.success("Account created successfully");
    } catch (error) {
      return error.response == null ? toast.error("Couldn't connect to the server") : toast.error("Error signing up: " + error.response.data.message);
    } finally {
      set({ isSigningUp: false });
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
  
}));
