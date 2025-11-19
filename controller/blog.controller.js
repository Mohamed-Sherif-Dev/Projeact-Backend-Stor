import asyncHandler from "express-async-handler";
import Blog from "../models/blog.model.js";

// POST /api/blog (add BLOG) (admin)
export const addBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json({ success: true, message: "Blog created successfully", data: blog });
});

// GET /api/blog (get all blog)
export const getAllBlogs = asyncHandler(async (req, res) => {
  let { page = 1, limit = 5 } = req.query;
  page = Number(page) || 1;
  limit = Number(limit) || 5;

  const total = await Blog.countDocuments();
  const blogs = await Blog.find()
    .sort({ publishedAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.json({
    success: true,
    count: blogs.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: blogs,
  });
});



// GET /api/blog/:id (get Blog by id)
export const getBlogById = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const blog = await Blog.findById(id)
    if(!blog){
        return res.status(404).json({success: false, message: "Blog not found"})
    }


    res.json({success: true, data: blog})
})



// PUT /api/blog/:id (update Blog) (admin)
export const updateBlog = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const blog = await Blog.findByIdAndUpdate(id , req.body,{
        new: true,
        runValidators: true
    })

    if(!blog){
        return res.status(404).json({success: false, message: "Blog not found"})
    }


    res.json({success: true, message: "Blog updated successfully", data: blog})
})


// DELETE /api/blog/:id (delete Blog) (admin)
export const deleteBlog = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const blog = await Blog.findByIdAndDelete(id)

    if(!blog){
        return res.status(404).json({success: false, message: "Blog not found"})
    }


    res.json({success: true, message: "Blog deleted successfully"})
})