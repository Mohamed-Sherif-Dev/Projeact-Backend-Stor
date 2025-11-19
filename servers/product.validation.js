import Joi from "joi";
import mongoose from "mongoose";


const ObjectId = (value , helpers) => {
    if(!mongoose.Types.ObjectId.isValid(value)){
        return helpers.error("any.invalid")
    }
    return value
};


export const createProductValidation = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    image: Joi.string().uri().required(),
    discount: Joi.number().min(0).max(5).optional(),
    inStock: Joi.boolean().optional(),
    review: Joi.number().min(0).max(5).optional(),
    price: Joi.number().min(0).required(),
    oldPrice: Joi.number().min(0).optional(),
    category: Joi.string().custom(ObjectId).required()
})



export const updateProductValidation = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    image: Joi.string().uri().optional(),
    discount: Joi.number().min(0).max(5).optional(),
    inStock: Joi.boolean().optional(),
    review: Joi.number().min(0).max(5).optional(),
    price: Joi.number().min(0).optional(),
    oldPrice: Joi.number().min(0).optional(),
    category: Joi.string().custom(ObjectId).optional()
}).min(1)




export const addReviewValidation = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().allow("").required()
})


export const getProductsByIdsValidation = Joi.object({
    ids: Joi.array()
    .items(Joi.string().custom(ObjectId))
    .min(1)
    .required()
})