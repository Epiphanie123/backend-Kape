import axios from "axios";

const API_URL = "http://localhost:8000/api/users/send-otp";

export const requestPasswordReset = (email: string) => {
  return axios.post(`${API_URL}/send-otp`, { email });
};

export const resetPassword = (otp: string, newPassword: string, email: string) => {
  return axios.post(`${API_URL}/reset-password`, { otp, newPassword, email });
};
