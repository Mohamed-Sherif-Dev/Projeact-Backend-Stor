import Joi from "joi";


export const createCartValidation = Joi.object({
    productId: Joi.string().hex().length(24).required(),
    quantity: Joi.number().integer().min(1).default(1)
})



export const updateCartValidation = Joi.object({
    quantity: Joi.number().integer().min(1).required()
})