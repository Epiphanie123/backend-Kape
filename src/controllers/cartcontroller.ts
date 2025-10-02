import { Request, Response } from "express";
import Cart, { ICart } from "../models/cart"; // ✅ Capitalized model


// 📌 Get cart
export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const cart = await Cart.findOne().populate("items.product"); // ✅ use Cart
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// 📌 Add to cart
export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, quantity } = req.body;
    let cart: ICart | null = await Cart.findOne(); // ✅ use Cart

    if (!cart) {
      cart = new Cart({ items: [] }); // ✅ new Cart
    }

    // ✅ Compare with item.product
    const itemIndex = cart.items.findIndex(
      (item) => item.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart" });
  }
};

// 📌 Remove from cart
export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    let cart: ICart | null = await Cart.findOne(); // ✅ use Cart

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    // ✅ Filter correctly using item.product
    cart.items = cart.items.filter(
      (item) => item.toString() !== productId
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item" });
  }
};
