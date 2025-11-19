import Joi from "joi";


export const createBlogValidation = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    image: Joi.string().uri().required(),
    description: Joi.string().min(2).max(100).required(),
    publishedAt: Joi.date().optional()
})




export const updateBlogValidation = Joi.object({
    title: Joi.string().min(2).max(100).optional(),
    image: Joi.string().uri().optional(),
    description: Joi.string().min(2).max(100).optional(),
    publishedAt: Joi.date().optional()
}).min(1)