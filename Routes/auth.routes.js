import express from "express";

import {
  getMe,
  googleCallback,
  googleLogin,
  login,
  refresh,
  register,
  getAllUsers,
  updateProfile,
  updatedUserRole,
  logout,
  getUserCount,
} from "../controller/auth.controller.js";
import { validate } from "../middleware/validation.js";
import {
  loginValidation,
  refreshTokenValidation,
  userValidation,
  updateProfileValidation,
  updateUserRoleValidation,
} from "../servers/auth.validation.js";
import { protect, allowedTo } from "../middleware/auth.middleware.js";

const authrouter = express.Router();

authrouter.route("/register").post(validate(userValidation), register);
authrouter.route("/login").post(validate(loginValidation), login);
authrouter
  .route("/refreshToken")
  .post(validate(refreshTokenValidation), refresh);
authrouter.get("/me", protect, getMe);
authrouter.get("/google", googleLogin);
authrouter.get("/google/callback", googleCallback);
authrouter.get("/users", protect, allowedTo("admin"), getAllUsers);
authrouter
  .route("/profile")
  .put(validate(updateProfileValidation), protect, updateProfile);
authrouter
  .route("/usrers/:id/role")
  .patch(
    protect,
    allowedTo("admin"),
    validate(updateUserRoleValidation),
    updatedUserRole
  );
authrouter.post("/logout", protect, logout);
authrouter.get("/userCount", protect, allowedTo("admin"), getUserCount);
export default authrouter;
