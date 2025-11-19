import express from "express";
import{
    createOrder,
    getMyOrders,
    getSingleOrder,
    getAllOrders,
    updateOrder,
    deleteOrder
} from "../controller/order.controller.js";
import { protect, allowedTo } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validation.js";
import{
    createOrderValidation,
    updateOrderValidation
} from "../servers/order.validation.js";

const orderRouter = express.Router();

orderRouter.post("/",protect,validate(createOrderValidation),createOrder);
// All order admin
orderRouter.get("/",protect,allowedTo("admin"),getAllOrders);

// My order
orderRouter.get("/me",protect,getMyOrders);

// One Order + update order + delete order
orderRouter
.route("/:id/status")
.get(protect,allowedTo("admin"),getSingleOrder)
.put(protect,allowedTo("admin"),validate(updateOrderValidation),updateOrder)
.delete(protect,allowedTo("admin"),deleteOrder);


export default orderRouter;