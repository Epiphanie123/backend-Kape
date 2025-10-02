"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var product_controller_1 = require("../controllers/product.controller");
var productrouter = (0, express_1.default)();
productrouter.post("/createproducts", product_controller_1.createProduct);
productrouter.get("/getProduct", product_controller_1.getProducts);
productrouter.get("/getproctuct:id", product_controller_1.getProduct);
productrouter.put("/updateProduct:id", product_controller_1.updateProduct);
productrouter.delete("/deleteProduct:id", product_controller_1.deleteProduct);
exports.default = productrouter;
