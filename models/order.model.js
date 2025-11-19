import mongoose from "mongoose";

const { Schema } = mongoose;


const orderIremSchema = new Schema({
    product:{
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        min: 1,
        default: 1,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
},{
    _id: false
})




    const orderSchema = new Schema({
        user:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        items:[orderIremSchema],
        totalPrice:{
            type: Number,
            min: 0,
            required: true
        },
        paymentMethod:{
            type: String,
            enum: ["Cash", "Card" , "Online" , 'paypal'],
            default: "Cash",
            required: true
        },
        status: {
            type: String,
            enum: ["Pending", "Delivered", "Cancelled"],
            default: "Pending",
            required: true
        },
        isPaid:{
            type: Boolean,
            default: false
        },
        paidAt:{
            type: Date,
            default: Date.now
        },
        shippingAddress:{
            type: String,
            trim: true,
            required: true
        },
        paymentResult: {
            id: String,
            status: String,
            amount: Number
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    },{
        timestamps: true
    })


    const Order = mongoose.model("Order", orderSchema);
    export default Order