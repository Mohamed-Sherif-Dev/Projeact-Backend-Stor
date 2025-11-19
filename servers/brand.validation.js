import Joi from "joi";



export const createBrandValidation = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    image: Joi.string().uri().required(),
    description: Joi.string().min(2).max(100).optional(),
    isActive: Joi.boolean().optional(),
    isPopular: Joi.boolean().optional(),
});




export const updateBrandValidation = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    image: Joi.string().uri().optional(),
    description: Joi.string().min(2).max(100).optional(),
    isActive: Joi.boolean().optional(),
    isPopular: Joi.boolean().optional(),
}).min(1)