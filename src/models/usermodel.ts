import mongoose, { Document } from 'mongoose';
import crypto from 'crypto';
import moment from 'moment';

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
  createdAt: Date;
  resetPasswordOTP?: string;
  otpExpiration?: Date;
  generateResetPasswordOTP(): string;
  validateResetPasswordOTP(otp: string): boolean;
  resetPassword(newPassword: string): Promise<void>;
}

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  resetPasswordOTP: { type: String },
  otpExpiration: { type: Date },
});

// Generate OTP
userSchema.methods.generateResetPasswordOTP = function (): string {
  const otp = crypto.randomInt(100000, 999999).toString().padStart(6, '0'); // Always 6 digits
  this.resetPasswordOTP = otp;
  this.otpExpiration = moment().add(10, 'minutes').toDate(); // 10 min expiry
  return otp;
};

// Validate OTP
userSchema.methods.validateResetPasswordOTP = function (otp: string): boolean {
  if (!this.resetPasswordOTP || !this.otpExpiration) return false;
  const otpStored = this.resetPasswordOTP.toString().trim();
  const otpReceived = otp.toString().trim();
  return otpStored === otpReceived && moment().isBefore(this.otpExpiration);
};

// Reset password
userSchema.methods.resetPassword = async function (newPassword: string): Promise<void> {
  this.password = newPassword; // Already hashed in controller
  this.resetPasswordOTP = undefined;
  this.otpExpiration = undefined;
  await this.save(); // Persist
};

export default mongoose.model<IUser>('User', userSchema);
