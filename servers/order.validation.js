import Joi from "joi";



export const createOrderValidation = Joi.object({
    paymentMethod: Joi.string().valid("cash" , "card").optional(),
    shippingAddress: Joi.string().max(300).optional()
});




export const updateOrderValidation = Joi.object({
    status: Joi.string().valid("pending" , "delivered" , "canceled").optional(),
    isPaid: Joi.boolean().optional()    
}).min(1)