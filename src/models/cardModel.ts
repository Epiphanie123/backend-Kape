import { Schema, model, Document } from "mongoose";

export interface ICard extends Document {
  title: string;
  description?: string;
  price: number;
  image?: string;
  discount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const cardSchema = new Schema<ICard>(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Card = model<ICard>("Card", cardSchema);
