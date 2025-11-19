import mongoose from "mongoose";

const { Schema } = mongoose;



const offerSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    image:{
        type: String,
        trim: true,
        required: true
    },
    inStock:{
        type: Boolean,
        default: true
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
    availableProducts:{
        type: Number,
        min: 0,
        default: 0
    },
    review:{
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    discount:{
        type: Number,
        min: 0,
        max: 300,
        default: 0
    },
    startDate:{
        type: Date,
        default: Date.now
    },
    endDate:{
        type: Date,
        default: null
    },
    isTop:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})




const Offer = mongoose.model("Offer" , offerSchema);
export default Offer