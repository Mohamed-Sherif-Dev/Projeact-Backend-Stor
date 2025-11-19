import Joi from "joi";


export const createOfferValidation = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    image: Joi.string().uri().required(),
    discount: Joi.number().min(0).max(100).required(),
    inStock: Joi.boolean().optional(),
    review: Joi.number().min(0).max(5).optional(),
    price: Joi.number().min(0).required(),
    oldPrice: Joi.number().min(0).optional(),
    availableProducts: Joi.number().min(0).optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().allow(null).optional(),
    isTop: Joi.boolean().optional(),
})



export const updateOfferValidation = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    image: Joi.string().uri().optional(),
    discount: Joi.number().min(0).max(100).optional(),
    inStock: Joi.boolean().optional(),
    review: Joi.number().min(0).max(5).optional(),
    price: Joi.number().min(0).optional(),
    oldPrice: Joi.number().min(0).optional(),
    availableProducts: Joi.number().min(0).optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().allow(null).optional(),
    isTop: Joi.boolean().optional(),
}).min(1)