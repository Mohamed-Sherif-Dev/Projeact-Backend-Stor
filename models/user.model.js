import mongoose from "mongoose";


const userModel = new mongoose.Schema({
    firstName:{
        type: "String",
        trim: true
    },
    lastName:{
        type: "String",
        trim: true
    },
   userName:{
        type: "String",
        trim: true
    },
    email:{
        type: "String",
        trim: true,
        unique: true
    },
    password:{
        type: "String",
        trim: true
    },
    profileimage:{
        type: "String",
    },
    role:{
        type: "String",
        enum: ["user" , "admin"],
        default: "user"
    },
    googleId: {
        type: "String",
        trim: true
    },
    provider:{
        type: "String",
        enum: ["google" , "local"],
        default: "local"
    },
    wishlist:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }]
},{
    timeseries: true   // دي علشان متنساهاش تاني بتاع التاريخ ي هنداسه
})


const User = mongoose.model("User" , userModel);

export default User;