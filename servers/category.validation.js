import Joi from "joi";

export const createCategoryValidation = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    discount: Joi.number().min(0).max(5).default(0),
    inStock: Joi.boolean().optional(),
    review: Joi.number().min(0).max(5).default(0),
    price: Joi.number().min(0).default(0),
    oldPrice: Joi.number().min(0).default(0),
    productCount: Joi.number().min(0).optional(),
});


export const updateCategoryValidation = Joi.object({
    name: Joi.string().min(3).max(25).optional(),
    image: Joi.string().uri().optional(),
    discount: Joi.number().min(0).max(5).optional(),
    inStock: Joi.boolean().optional(),
    review: Joi.number().min(0).max(5).optional(),
    price: Joi.number().min(0).optional(),
    oldPrice: Joi.number().min(0).optional(),
    productCount: Joi.number().min(0).optional(),
})