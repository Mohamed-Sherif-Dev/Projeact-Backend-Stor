import mongoose from "mongoose";

const categoryModel = new mongoose.Schema({
    name:{
        type: "String",
        trim: true,
        unique: true,
        required: true
    },
    image:{
        type: "String",
        trim: true
    },
    discount:{
        type: "Number",
        min: 0,
        max: 30,
        default: 0
    },
    inStock:{
        type: Boolean,
        default: true
    },
    review:{
        type: "Number",
        min: 0,
        max: 5,
        default: 0
    },
    price:{
        type: "Number",
        min: 0,
        default: 0
    },
    oldPrice:{
        type: "Number",
        min: 0,
        default: 0
    },
    productCount:{
        type: "Number",
        min: 0,
        default: 0
    },
},{
    timestamps: true
})


const Category = mongoose.model("Category", categoryModel);
export default Category