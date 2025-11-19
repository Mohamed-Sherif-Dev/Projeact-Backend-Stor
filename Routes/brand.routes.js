import express from "express";

import {
  addBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand,
} from "../controller/barnd.controller.js";
import { validate } from "../middleware/validation.js";
import {
  createBrandValidation,
  updateBrandValidation,
} from "../servers/brand.validation.js";
import { protect, allowedTo } from "../middleware/auth.middleware.js";

const brandrouter = express.Router();

// /api/brand

brandrouter
  .route("/")
  .post(protect, allowedTo("admin"), validate(createBrandValidation), addBrand)
  .get(getAllBrands);

// /api/brand/:id

brandrouter
  .route("/:id")
  .get(getSingleBrand)
  .put(
    protect,
    allowedTo("admin"),
    validate(updateBrandValidation),
    updateBrand
  )
  .delete(protect, allowedTo("admin"), deleteBrand);



export default brandrouter;