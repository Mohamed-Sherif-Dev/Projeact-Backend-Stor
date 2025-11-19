import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

// POST /api/wishlist (add to wishlist)
// export const addToWishlist = asyncHandler(async (req, res) => {
//   const userId = req.user.id;
//   const { productId } = req.params;

//   // All produact
//   const product = await Product.findById(productId);
//   if (!product) {
//     return res
//       .status(404)
//       .json({ success: false, message: "Product not found" });
//   }

//   // Add product to whishlist
//   const user = await User.findByIdAndUpdate(
//     userId,
//     { $addToSet: { wishlist: productId } },
//     { new: true }
//   ).populate("wishlist");

//   res.json({ success: true, data: user.wishlist });
// });
export const addToWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id;          // جاي من auth middleware
  const { productId } = req.params;    // لازم يكون route = /api/wishlist/:productId

  // 1) تأكد إن الـ product موجود
  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  // 2) أضف المنتج للـ wishlist بدون تكرار
  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { wishlist: productId } }, // $addToSet يمنع التكرار
    { new: true }
  ).populate("wishlist");

  return res.json({
    success: true,
    message: "Product added to wishlist",
    data: user.wishlist,
  });
});
// DELETE /api/wishlist/:id (remove from wishlist)
export const removeFromWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { wishlist: productId } },
    { new: true }
  ).populate("wishlist");

  res.json({ success: true, data: user.wishlist });
});



// GET /api/wishlist (get wishlist)
export const getWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId).populate("wishlist");
  res.json({ success: true,count: user.wishlist.length ,data: user.wishlist });
});
