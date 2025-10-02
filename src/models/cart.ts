import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./product";

export interface ICartItem {
  product: IProduct["_id"];
  quantity: number;
}

export interface ICart extends Document {
  items: ICartItem[];
}

const cartSchema = new Schema<ICart>({
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});

export default mongoose.model<ICart>("cart", cartSchema);