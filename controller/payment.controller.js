import asyncHandler from "express-async-handler";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/payment/create-payment-intent
export const createPaymentIntent = asyncHandler(async (req, res) => {
    const { amount } = req.body;

    if(!amount || amount <= 0){
        return res.status(400).json({success: false, message: "Amunt is required must be greater than 0"})
    }

    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: process.env.STRIPE_CURRENCY,
    });

    res.json({
        success: true,
        clientSecret: paymentIntent.client_secret,
    });
})