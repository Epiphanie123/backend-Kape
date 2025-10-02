import express from "express";

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

const productrouter= express();

productrouter.post("/createproducts", createProduct);
productrouter.get("/getProduct", getProducts);
productrouter.get("/getproctuct:id", getProduct);
productrouter.put("/updateProduct:id", updateProduct);
productrouter.delete("/deleteProduct:id", deleteProduct);

export default productrouter;