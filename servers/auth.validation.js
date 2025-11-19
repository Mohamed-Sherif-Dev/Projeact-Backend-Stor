import Joi from "joi";

export let userValidation = Joi.object({
  firstName: Joi.string().min(3).max(25).required(),
  lastName: Joi.string().min(3).max(25).required(),
  userName: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().min(3).max(25).required(),
  password: Joi.string().required(),
  profileimage: Joi.string().required(),
  role: Joi.string().optional(),
});



export let loginValidation = Joi.object({
  email: Joi.string().email().min(3).max(25).required(),
  password: Joi.string().required(),
});


export let refreshTokenValidation = Joi.object({
  refreshToken: Joi.string().required(),
});


// update user Profile
export let updateProfileValidation = Joi.object({
  firstName: Joi.string().min(3).max(25).optional(),
  lastName:Joi.string().min(3).max(25).optional(),
  userName: Joi.string().min(3).max(50).optional(),
  profileimage: Joi.string().optional(),
})


// update user role admin 
export let updateUserRoleValidation = Joi.object({
  role: Joi.string().valid("user", "admin").required(),
});