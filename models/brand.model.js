import mongoose from "mongoose";

const { Schema } = mongoose;


export const brandSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    image:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        trim: true
    },
    isActive:{
        type: Boolean,
        default: true
    },
    isPopular:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})


const Brand = mongoose.model("Brand", brandSchema);
export default Brand