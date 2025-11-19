import express from "express";
import {validate} from "../middleware/validation.js";   
import {protect} from "../middleware/auth.middleware.js";
import{
    addToCart,
    getMyCart,
    updateCartItem,
    removeCartItem,
    clearCart
} from "../controller/cart.controller.js";

import {createCartValidation , updateCartValidation} from "../servers/cart.validation.js";


const cartrouter = express.Router();

cartrouter.use(protect);

cartrouter.route("/")
.get(getMyCart)
.post(validate(createCartValidation), addToCart)
.delete(clearCart);


cartrouter.route("/:productId")
.put(validate(updateCartValidation), updateCartItem)
.delete(removeCartItem);



export default cartrouter;