// controller/cart.controller.js
import asyncHandler from "express-async-handler";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

// helper عشان أجيب الكارت أو أعمل واحد جديد
const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
      cartTotal: 0,
    });
  }
  return cart;
};

// POST /api/cart  (add to cart)
export const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  let cart = await getOrCreateCart(userId);

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId.toString()
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
      price: product.price,
    });
  }

  cart.calcTotal();
  await cart.save();
  cart = await cart.populate("items.product");

  res.json({ success: true, data: cart });
});

// GET /api/cart  (get my cart)
export const getMyCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart) {
    return res.json({
      success: true,
      data: { items: [], cartTotal: 0 },
    });
  }

  res.json({ success: true, data: cart });
});

// PUT /api/cart/:productId  (update quantity)
export const updateCartItem = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const { quantity } = req.body;

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return res
      .status(404)
      .json({ success: false, message: "Cart not found" });
  }

  const item = cart.items.find(
    (el) => el.product.toString() === productId.toString()
  );

  if (!item) {
    return res
      .status(404)
      .json({ success: false, message: "Item not found in cart" });
  }

  item.quantity = quantity;
  cart.calcTotal();
  await cart.save();
  cart = await cart.populate("items.product");

  res.json({ success: true, data: cart });
});

// DELETE /api/cart/:productId  (remove item)
export const removeCartItem = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return res
      .status(404)
      .json({ success: false, message: "Cart not found" });
  }

  cart.items = cart.items.filter(
    (el) => el.product.toString() !== productId.toString()
  );
  cart.calcTotal();
  await cart.save();
  cart = await cart.populate("items.product");

  res.json({ success: true, data: cart });
});

// DELETE /api/cart  (clear cart)
export const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.json({
      success: true,
      data: { items: [], cartTotal: 0 },
    });
  }

  cart.items = [];
  cart.cartTotal = 0;
  await cart.save();

  res.json({ success: true, message: "Cart cleared", data: cart });
});