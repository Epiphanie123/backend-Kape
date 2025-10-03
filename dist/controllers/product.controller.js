"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.createProduct = void 0;
const productmodel_1 = __importDefault(require("../models/productmodel"));
// ✅ Create Product
const createProduct = async (req, res) => {
    try {
        const { name, price, description, inStock } = req.body;
        const newProduct = new productmodel_1.default({
            name,
            price,
            description,
            inStock,
        });
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: savedProduct });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
exports.createProduct = createProduct;
// ✅ Get All Products
const getProducts = async (req, res) => {
    try {
        const products = await productmodel_1.default.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
exports.getProducts = getProducts;
// ✅ Get Single Product by ID
const getProduct = async (req, res) => {
    try {
        const product = await productmodel_1.default.findById(req.params.id);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
exports.getProduct = getProduct;
// ✅ Update Product
const updateProduct = async (req, res) => {
    try {
        const product = await productmodel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.json(product);
    }
    catch (error) {
        res.status(400).json({ message: "Update failed", error });
    }
};
exports.updateProduct = updateProduct;
// ✅ Delete Product
const deleteProduct = async (req, res) => {
    try {
        const product = await productmodel_1.default.findByIdAndDelete(req.params.id);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
exports.deleteProduct = deleteProduct;
