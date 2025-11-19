import asyncHandler from "express-async-handler";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js"



const calcAverageReview = (product) => {
  if (!product.reviews || product.reviews.length === 0) return 0;

  const sum = product.reviews.reduce((total, rev) => {
    return total + Number(rev.rating);
  }, 0);

  const avg = sum / product.reviews.length;

  return avg;
};

// POST /api/product (admin)
export const createProduct = asyncHandler(async (req, res) => {
    const {name , category} = req.body;

    const cat = await Category.findById(category)
    if(!cat){
        return res.status(400).json({success: false, message: "Category not found"})
    }

    const exists = await Product.findOne({name})
    if(exists){
        return res.status(400).json({success: false, message: "Product already exists"})
    }

    const product = await Product.create(req.body)
    res.json({success: true, message: "Product created successfully", data: product})
})



// GET /api/product
// ?page=1&limit=10&serch=phone
export const getAllProducts = asyncHandler(async (req, res) => {

  let { page = 1, limit = 10, search = "" } = req.query;
  page = Number(page) || 1;
  limit = Number(limit) || 10;

  const filter = {};
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  const total = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    success: true,
    count: products.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: products
  });

});


// Get /api/produact/:id
export const getSingleProduct = asyncHandler(async (req , res)=>{
  const {id} = req.params;

  const product = await Product.findById(id).populate("category", "name")
  if(!product){
      return res.status(404).json({success: false, message: "Product not found"})
  }

  res.json({success: true, data: product})
})


// PUT /api/product/:id (admin)
export const updateProduct = asyncHandler(async (req , res)=>{
  const {id} = req.params;

  if(req.body.category){
    const cat = await Category.findById(req.body.category)
    if(!cat){
        return res.status(400).json({success: false, message: "Category not found"})
    }
  }

  const produact = await Product.findByIdAndUpdate(id , req.body,{
      new: true,
      runValidators: true
  })

  if(!produact){
      return res.status(404).json({success: false, message: "Product not found"})
  }

  res.json({success: true, message: "Product updated successfully", data: produact})
})



// DELETE /api/product/:id (admin)
export const deleteProduct = asyncHandler(async (req , res)=>{
  const {id} = req.params;

  const produact = await Product.findByIdAndDelete(id)

  if(!produact){
      return res.status(404).json({success: false, message: "Product not found"})
  }

  res.json({success: true, message: "Product deleted successfully"})
})



// POST /api/product/ids (getProduact)
export const getProductsByIds = asyncHandler(async (req , res)=>{
  const {ids} = req.body;

  const products = await Product.find({ _id: { $in: ids } });
  res.json({success: true,
    count: products.length,
    data: products})
})



// GET /api/produact/category/:category
export const getProductsByCategory = asyncHandler(async (req , res)=>{
  const {categoryId} = req.params;

  const products = await Product.find({category: categoryId}).populate("category", "name")

  res.json({success: true,
    count: products.length,
    data: products})
})

export const addProductReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const rating = Number(req.body.rating);
  const comment = req.body.comment;
  const userId = req.user.id;

  // 1) Get Product
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  // 2) Check if user already reviewed
  const existingReview = product.reviews.find(
    (rev) => rev.user.toString() === userId.toString()
  );

  if (existingReview) {
    // Update old review
    existingReview.rating = rating;
    existingReview.comment = comment;
  } else {
    // Add new review
    product.reviews.push({
      user: userId,
      rating,
      comment,
    });
  }

  // 3) Update average rating
  product.review = calcAverageReview(product);

  // 4) Save changes
  await product.save();

  res.json({
    success: true,
    message: "Review added successfully",
    data: product,
  });
});

// GET /api/produact/best-Seller (getBestSeller)
export const getBestSeller = asyncHandler(async (req , res)=>{
  let {limit = 10} = req.query;

  limit = Number(limit) || 10;

  const products = await Product.find().sort({salesCount: -1 , review: -1}).limit(limit)

  res.json({success: true,
    count: products.length,
    data: products})
})