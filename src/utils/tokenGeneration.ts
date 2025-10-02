import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import  { IUser } from "../models/usermodel";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET
export const generateAccessToken = (user: IUser): string => {
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return Jwt.sign(
    { 
      _id: user._id, 
      fullname:user.fullname,
      email: user.email, 
      role: user.role   
    },
    jwtSecret,
    { expiresIn: "7h" }
  );
};