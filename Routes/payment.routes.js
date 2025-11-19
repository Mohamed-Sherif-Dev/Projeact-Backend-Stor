import express from "express";
import { createPaymentIntent } from "../controller/payment.controller.js";
import { protect } from "../middleware/auth.middleware.js";


const paymentRouter = express.Router();

paymentRouter.post("/create-payment-intent",protect, createPaymentIntent);

export default paymentRouter;