import Joi from "joi";


export const createContactValidation = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
   phone: Joi.string().min(2).max(100).required(),
    message: Joi.string().min(2).max(100).required(),
})



export const updateContactValidation = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    email: Joi.string().email().optional(),
   phone: Joi.string().min(2).max(100).optional(),
    message: Joi.string().min(2).max(100).optional(),
    status: Joi.string().valid("new" , "read" , "replied").optional()
})