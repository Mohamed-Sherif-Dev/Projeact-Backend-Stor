import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getProductsByIds,
  getProductsByCategory,
  addProductReview,
  getBestSeller,
} from "../controller/product.controller.js";
import { validate } from "../middleware/validation.js";
import {
  createProductValidation,
  updateProductValidation,
  addReviewValidation,
  getProductsByIdsValidation,
} from "../servers/product.validation.js";
import { protect, allowedTo } from "../middleware/auth.middleware.js";
import express from "express";

const productrouter = express.Router();

productrouter
  .route("/")
  .post(
    protect,
    allowedTo("admin"),
    validate(createProductValidation),
    createProduct
  ).get(getAllProducts);

  // getProductsIds
  productrouter.post(
    "/ids",
    validate(getProductsByIdsValidation),
    getProductsByIds
  );

  // best seller
  productrouter.get("/best-seller", getBestSeller);

  // by category
  productrouter.get("/category/:categoryId", getProductsByCategory);

  // single / update / delete
  productrouter
    .route("/:id")
    .get(getSingleProduct)
    .put(
      protect,
      allowedTo("admin"),
      validate(updateProductValidation),
      updateProduct
    )
    .delete(protect, allowedTo("admin"), deleteProduct);

  // add review
  productrouter.post(
    "/:id/review",
    protect,
    validate(addReviewValidation),
    addProductReview
  );

export default productrouter;
