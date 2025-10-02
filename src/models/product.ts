import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {

  "name": string,
  "price": Number,
  "description":string
   "inStock": true
}

const productSchema = new mongoose.Schema({
 name: { type: String, required: true, trim: true },
 price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
    inStock: { type: Boolean, default: true },
});


const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;