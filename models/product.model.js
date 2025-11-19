import mongoose from "mongoose";

const { Schema } = mongoose;


const reviwSchema = new Schema({
   user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
   },
   rating:{
    type: Number,
    min: 1,
    max: 5,
    required: true
   },
   comment:{
    type: String,
    required: true
   },
},{
    timestamps: true
})




const productSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    image:{
        type:String,
        trim: true,
        required: true
    },
    discount:{
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    inStock:{
        type: Boolean,
        default: true
    },
    review:{
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    price:{
        type: Number,
        min: 0,
        default: 0
    },
    oldPrice:{
        type: Number,
        min: 0,
        default: 0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    // REVIEWS
    reviews: [reviwSchema],
    salesCount: {
        type: Number,
        min: 0,
        default: 0
    }
},{
    timestamps: true
})


const Product = mongoose.model("Product", productSchema)
export default Product