import express from "express";

import {
 addToWishlist,
 removeFromWishlist,
 getWishlist
} from "../controller/wishlist.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const wishlistrouter = express.Router();

wishlistrouter.use(protect);

// GET /api/wishlist
wishlistrouter.route("/").get(getWishlist);

// POST /api/wishlist (add to wishlist)
wishlistrouter.post("/:productId", addToWishlist);

// DELETE /api/wishlist/:id (remove from wishlist)
wishlistrouter.delete("/:productId", removeFromWishlist);

export default wishlistrouter;