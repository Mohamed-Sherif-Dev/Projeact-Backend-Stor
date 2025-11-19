import asyncHandler from "express-async-handler";
import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";


//helpers
const calcCartTotal = (cart) => 
    cart.items.reduce((sum , item)=> sum + item.price * item.quantity , 0)


// POST /api/orders (create order from cart)
export const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const {paymentMethod = "Cash", shippingAddress  = ""} = req.body;

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return res
      .status(404)
      .json({ success: false, message: "Cart not found is empty" });
  }

  const totalPrice = cart.cartTotal || calcCartTotal(cart);

  const orderItems = cart.items.map((item) => ({
    product: item.product,
    quantity: item.quantity,
    price: item.price,
  }));

  const order = await Order.create({
    user: userId,
    items: orderItems,
    paymentMethod,
    shippingAddress,
    totalPrice,
  });

  cart.items = [];
  cart.cartTotal = 0;
  await cart.save();

  res.status(201).json({
    success:true,
    message: "Order created successfully",
    data: order
  })
})



// GET /api/orders/my
export const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).populate("items.product" , "name image price");
  res.json({ success: true, count: orders.length, data: orders });
});



// GET /api/orders/:id (get single order)
export const getSingleOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const order = await Order.findById(id)
    .populate("user" , "firstName lastName email")
    .populate("items.product" , "name image price")
    if(!order){
        return res.status(404).json({success: false , message: "Order not found"})
    }

    if(req.user.rol !== "admin" && order.user_id !== req.user.id.toString()){
        return res.status(401).json({success: false , message: "No allowed to view this order"})
    }

    res.json({success: true , data: order})
})


// GET /api/order (get all orders - admin)
export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate("user" , "firstName lastName email").populate("items.product" , "name image price")

    res.json({success: true , count: orders.length , data: orders})
})


// PUT /api/orders/:id (update order) - admin only
export const updateOrder = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {status , isPaid} = req.body;


    const order = await Order.findById(id)
    if(!order){
        return res.status(404).json({success: false , message: "Order not found"})
    }

    if(status) order.status = status;
    if(typeof isPaid === "boolean"){
        order.isPaid = isPaid;
        order.paidAt = isPaid ? Date.now() : null;
    }

    await order.save();
    res.json({success: true , message: "Order updated successfully" , data: order})
})


// PUT /api/order/:id/pay
// PUT /api/order/:id/pay
// export const markOrderPaid = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { paymentIntentId, status, amount } = req.body;

//   const order = await Order.findById(id);
//   if (!order) {
//     return res
//       .status(404)
//       .json({ success: false, message: "Order not found" });
//   }

//   order.isPaid = true;
//   order.paidAt = Date.now();
//   order.paymentMethod = "card";
//   order.paymentResult = {
//     id: paymentIntentId,
//     status,
//     amount,
//   };

//   const updatedOrder = await order.save();

//   res.json({
//     success: true,
//     message: "Order marked as paid",
//     data: updatedOrder,
//   });
// });




// DELETE /api/orders/:id (delete order) - admin only
export const deleteOrder = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const order = await Order.findByIdAndDelete(id)

    if(!order){
        return res.status(404).json({success: false , message: "Order not found"})
    }


    res.json({success: true , message: "Order deleted successfully"})
})











