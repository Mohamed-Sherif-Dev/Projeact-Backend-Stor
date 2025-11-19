import express from "express";

import {addBlog ,getAllBlogs , getBlogById , updateBlog , deleteBlog } from "../controller/blog.controller.js";
import { validate } from "../middleware/validation.js";
import { createBlogValidation , updateBlogValidation } from "../servers/blog.validation.js";
import { protect, allowedTo } from "../middleware/auth.middleware.js";

const blogrouter = express.Router();

// /api/blog

blogrouter.route("/").post(protect, allowedTo("admin"), validate(createBlogValidation), addBlog).get(getAllBlogs);

// /api/blog/:id

blogrouter.route("/:id").get(getBlogById).put(protect, allowedTo("admin"), validate(updateBlogValidation), updateBlog).delete(protect, allowedTo("admin"), deleteBlog);



export default blogrouter;