import mongoose, { Schema, Document } from "mongoose";

interface ProductItem {
  id: number;
  name: string;
  price: string;
  image: string;
}

export interface OrderDocument extends Document {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  products: ProductItem[];
  totalPrice: number;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema<ProductItem>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
});

const OrderSchema: Schema = new Schema<OrderDocument>({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  products: { type: [ProductSchema], required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model<OrderDocument>("Order", OrderSchema);
