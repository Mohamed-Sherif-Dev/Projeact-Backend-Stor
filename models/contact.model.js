import e from "express";
import mongoose from "mongoose";

const { Schema } = mongoose;



const contactSchema = new Schema({
    name:{
        type: "String",
        trim: true,
        required: true
    },
    email:{
        type: "String",
        trim: true,
        required: true
    },
    phone:{
        type: "String",
        trim: true,
        required: true
    },
    message:{
        type: "String",
        trim: true,
        required: true
    },
    status:{
        type: "String",
        trim: true,
        enum: ["new", "red", "replied"],
        default: "new"
    }
},{
    timestamps: true
})




const Contact = mongoose.model("Contact", contactSchema)
export default Contact