import express from "express";
import { createCategory, getAllCategories , getSingleCategory , updateCategory , deleteCategory } from "../controller/category.controller.js";
import { validate } from "../middleware/validation.js";
import { createCategoryValidation , updateCategoryValidation } from "../servers/category.validation.js";
import { protect, allowedTo } from "../middleware/auth.middleware.js";

const categoryrouter = express.Router();

categoryrouter.route("/").post(protect , allowedTo("admin"), validate(createCategoryValidation), createCategory).get(getAllCategories);

categoryrouter.route("/:id")
  .get(getSingleCategory)
  .put(protect, allowedTo("admin"), validate(updateCategoryValidation), updateCategory)
  .delete(protect, allowedTo("admin"), deleteCategory);



export default categoryrouter;