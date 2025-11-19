import asyncHandler from "express-async-handler";
// import Category from "../models/category.model.js";
import Category from "../models/category.model.js";
// Post /api/category (admin)
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const exists = await Category.findOne({ name });

  if (exists) {
    return res
      .status(400)
      .json({ success: false, message: "Category already exists" });
  }

  const category = await Category.create(req.body);
  res.json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

// GET /api/category (all category)
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json({ success: true, count: categories.length, data: categories });
});

// GET /api/category/:id (single category)
export const getSingleCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: "Category not found" });
  }

  res.json({ success: true, data: category });
});

// PUT /api/category/:id (admin)
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: "Category not found" });
  }

  res.json({
    success: true,
    message: "Category updated successfully",
    data: category,
  });
});

// DELETE /api/category/:id (admin)
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: "Category not found" });
  }

  res.json({ success: true, message: "Category deleted successfully" });
});
