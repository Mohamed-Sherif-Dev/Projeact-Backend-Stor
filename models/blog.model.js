import mongoose from "mongoose";

const { Schema } = mongoose;

const blogSchema = new Schema({
    title:{
        type: "String",
        trim: true,
        required: true
    },
    image:{
        type: "String",
        trim: true,
        required: true
    },
    description:{
        type: "String",
        trim: true,
        required: true
    },
    publishedAt:{
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
})



const Blog = mongoose.model("Blog", blogSchema);
export default Blog