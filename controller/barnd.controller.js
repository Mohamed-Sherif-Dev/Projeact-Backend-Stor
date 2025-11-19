import asyncHandler from "express-async-handler";
import Brand from "../models/brand.model.js";

// POST /api/brand (add brand) (admin)
export const addBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.create(req.body);
  res.json({
    success: true,
    message: "Brand created successfully",
    data: brand,
  });
});

// GET /api/brand (get all brand)
export const getAllBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find().sort({ createdAt: -1 });
  res.json({ success: true, count: brands.length, data: brands });
});

// GET /api/brand/:id (get single brand)
export const getSingleBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);

  if (!brand) {
    return res.status(404).json({ success: false, message: "Brand not found" });
  }
  res.json({ success: true, data: brand });
});

// PUT /api/brand/:id (update brand) (admin)
export const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const brand = await Brand.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!brand) {
    return res.status(404).json({ success: false, message: "Brand not found" });
  }

  res.json({
    success: true,
    message: "Brand updated successfully",
    data: brand,
  });
});

// DELETE /api/brand/:id (delete brand) (admin)
export const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const brand = await Brand.findByIdAndDelete(id);

  if (!brand) {
    return res.status(404).json({ success: false, message: "Brand not found" });
  }

  res.json({ success: true, message: "Brand deleted successfully" });
});
